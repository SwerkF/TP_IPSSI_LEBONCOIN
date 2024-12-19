export interface JsonResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
    token?: string;
}
  
  export interface IndexResponse<T> {
    items: T[];
    stats?: {
      [key: string]: {
        stat: number;
        name: string;
      };
    };
    sources?: {
      [key: string]: {
        count: number;
        canPublish: boolean;
      };
    };
}
