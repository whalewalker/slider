export type FileStatus = 'in-que' | 'done';

export type FileItemType = {
    file: File;
    status: FileStatus;
    id: number
};

export interface IPresentationRequest {
    title: string,
    file: File
}

interface ErrorResponse {
    errorCode: string;
    errorMessage: string;
}

export interface Response<T> {
    statusCode: string;
    responseCode: string;
    responseMessage: string;
    errors: ErrorResponse[];
    modelList: T[];
    count: number;
}

export interface IMedia {
    id: string;
    path: string;
    name: string;
    storageId: string;
    checkSum: string;
    contentType: string;
    size: number;
    position: number;
    index: number
}

export interface IPresentation {
    id?: string;
    title?: string;
    folderId?: string;
    uuid?: string;
    mediaList?: IMedia[];
}