import axios from 'axios';
import { JsonResponse } from "@/models/utilsModel";
import { Annonce } from "@/models/Annonce";

export class AnnonceApiService {
    private baseUrl = 'http://localhost:8081/annonces';

    private getAuthHeaders() {
        const token = localStorage.getItem('token');
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
    }

    async getAnnonces(): Promise<Annonce[]> {
        const response = await axios.get(this.baseUrl);
        return response.data;
    }

    async getAnnonce(id: string): Promise<Annonce> {
        const response = await axios.get(`${this.baseUrl}/${id}`);
        return response.data;
    }

    async createAnnonce(annonceData: any): Promise<any> {
        const response = await axios.post(this.baseUrl, annonceData, {
            headers: this.getAuthHeaders()
        });
        return response.data;
    }

    async editAnnonce(id: string, annonceData: any): Promise<Annonce> {
        const response = await axios.patch(`${this.baseUrl}/${id}`, annonceData, {
            headers: this.getAuthHeaders()
        });
        return response.data;
    }

    async deleteAnnonce(id: string): Promise<any> {
        const response = await axios.delete(`${this.baseUrl}/${id}`, {
            headers: this.getAuthHeaders()
        });
        return response.data;
    }
}
