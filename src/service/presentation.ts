import {IPresentationRequest, Response,} from "../util/types";
import {api} from "./api";

export const createPresentation = async (data: IPresentationRequest): Promise<Response<any>> => {


    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("file", data.file);

    return await api.post(`/presentation/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
};