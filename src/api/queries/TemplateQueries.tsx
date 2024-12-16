import { toast } from "react-toastify";

import { Template } from "@/models/Template";
import queryClient from "@/configs/queryClient";
import { JsonResponse } from "@/models/utilsModel";
import { useMutation, useQuery } from "@tanstack/react-query";

import { TemplateApiService } from "../TemplateApiService";

const templateMessage = new TemplateApiService();

export const useGetTemplates = () => {
    return useQuery<JsonResponse<Template[]>>({
        queryKey: ["templates"],
        queryFn: async () => {
            const response = await templateMessage.getTemplates();
            return response;
        }
    })
}

export const useCreateTemplate = () => {
    return useMutation<JsonResponse<Template>, Error, Template>({
        mutationFn: async (template) => {
            const response = await templateMessage.createTemplate(template);
            return response;
        },
        onMutate: async (template) => {

            const toastId = toast.info("Création du template en cours...", {
                autoClose: false,
                isLoading: true
            });

            const previousMessage = queryClient.getQueryData<JsonResponse<Template[]>>(["templates"]);

            queryClient.setQueryData<JsonResponse<Template[]>>(["templates"], (oldData: any) => {
                return {
                    ...oldData,
                    data: [
                        ...oldData.data,
                        template
                    ]
                }
            });

            return { previousMessage, toastId };
        },
        onSuccess: (_data, _variables, _context:any) => {
            toast.update(_context.toastId, {
                render: "Template créé avec succès",
                type: "success",
                isLoading: false,
                autoClose: 3000
            });
        },
        onError: (_error, _variables, _context:any) => {
            queryClient.setQueryData<JsonResponse<Template[]>>(["templates"], _context.previousMessage);
            toast.update(_context.toastId, {
                render: "Erreur lors de la création du template",
                type: "error",
                isLoading: false,
                autoClose: 3000
            });
        }
    })
}
