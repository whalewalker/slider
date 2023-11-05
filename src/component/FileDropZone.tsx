import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import {AiOutlineCloudUpload} from 'react-icons/ai';

type FileDropZoneProps = {
    onFileSelected: (files: File[]) => void;
};

const FileDropZone: React.FC<FileDropZoneProps> = ({onFileSelected}) => {
    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const allowedFileTypes = ['image/*', 'application/pdf', 'video/*', 'image/svg+xml'];
            const filteredFiles = acceptedFiles.filter((file) =>
                allowedFileTypes.some((type) => file.type.match(type))
            );
            onFileSelected(filteredFiles);
        },
        [onFileSelected]
    );

    const {getRootProps, getInputProps} = useDropzone({
        onDrop,
        accept: {
            'image/*': [],
            'application/pdf': [],
            'video/*': [],
            'image/svg+xml': []
        },
        multiple: true,
    });

    return (
        <div
            {...getRootProps()}
            className="flex flex-col items-center justify-center w-full h-72 md:h-80 rounded-2xl spaced-dotted-border cursor-pointer hover:bg-[#FEFBFE]"
        >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <AiOutlineCloudUpload size={45} color="#3139B7FF"/>
                <p className="mb-2 mt-2 text-sm text-[#3139B7FF]">Click or drop your files here</p>
                <input id="dropzone-file" type="file" {...getInputProps()} className="hidden"/>
            </div>
        </div>
    );
};

export default FileDropZone;
