class BackendApi {
    private url: string;

    constructor() {
        this.url = import.meta.env.VITE_API_BASE_URL as string || 'http://localhost:8000';
    }

    public getUrl(): string {
        return this.url;
    }

    private createHeaders(includeAuth: boolean = false, isFormData: boolean = false): HeadersInit {
        const headers: HeadersInit = {};
        
        if (!isFormData) {
            headers['Content-Type'] = 'application/json';
        }
        
        if (includeAuth) {
            const token = localStorage.getItem('token');
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
        }
        
        return headers;
    }

    // Gestion des erreurs 401 et retry
    private async handleUnauthorizedRequest(response: Response, retryRequest: () => Promise<Response>): Promise<Response> {
        if (response.status === 401) {
            const refreshToken = localStorage.getItem('refresh_token');
            if (refreshToken) {
                const newToken = await this.getNewAccessToken(refreshToken);
                
                if (newToken && newToken.token) {
                    return retryRequest();
                }
            }
        }
        return response;
    }

    // Fonction générique pour gérer toutes les requêtes HTTP
    public async fetchRequest(
        url: string, 
        method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH', 
        body: any = null, 
        includeAuth: boolean = false
    ): Promise<any> {
        const isFormData = body instanceof FormData;
        
        const options: RequestInit = {
            method,
            headers: this.createHeaders(includeAuth, isFormData),
        };

        if (body) {
            options.body = isFormData ? body : JSON.stringify(body);
        }

        let response = await fetch(url, options);
        
        response = await this.handleUnauthorizedRequest(response, () => 
            this.fetchRequest(url, method, body, includeAuth)
        );

        if (!response.ok) {
            throw new Error(`${method} request failed: ${response.statusText}`);
        }

        if(method === 'DELETE' && response.status === 204) {
            return { success: true };
        }

        return response.json();
    }

    // Récupération d'un nouveau token via le refresh token
    public async getNewAccessToken(refresh_token: string): Promise<any> {
        const response = await this.fetchRequest(`${this.url}/api/token/refresh`, 'POST', { refresh_token });

        if (response.token) {
            localStorage.setItem('token', response.token);
        }

        if (response.refresh_token) {
            localStorage.setItem('refresh_token', response.refresh_token);
        }

        return response || null;
    }
}

export const backendApi = new BackendApi();