export type FileStatus = 'in-que' | 'done';

export type FileItemType = {
    file: File;
    status: FileStatus;
};