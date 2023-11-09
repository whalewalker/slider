export type FileStatus = 'in-que' | 'done';

export type FileItemType = {
    file: File;
    status: FileStatus;
    id: number
};

export type FileColumnType = {
    fileItem: FileItemType[];
    id: number
}