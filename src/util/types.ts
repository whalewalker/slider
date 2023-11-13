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