import {IPresentationRequest, Response,} from "../util/types";
import {api} from "./api";
import {AxiosResponse} from "axios";

export const createPresentation = (data: IPresentationRequest): Promise<AxiosResponse<Response<any>>> => {

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("file", data.file);

    return api.post(`/presentation/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
};

export const getPresentationByUuid = async (uuid: string): Promise<AxiosResponse<Response<any>>> => {
    return api.get(`/presentation/${uuid}`);
};