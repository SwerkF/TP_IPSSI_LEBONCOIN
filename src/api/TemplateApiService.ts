import { JsonResponse } from "@/models/utilsModel";
import { Template } from "../models/Template";
import { backendApi } from "./BackendApi";

export class TemplateApiService {

    private baseUrl = backendApi.getUrl() + '/api/templates';

    public async getTemplates(): Promise<JsonResponse<Template[]>> {
        return backendApi.fetchRequest(this.baseUrl, 'GET', null, true);
    }

    public async createTemplate(template: Template): Promise<JsonResponse<Template>> {
        return backendApi.fetchRequest(this.baseUrl, 'POST', template, true);
    }
}