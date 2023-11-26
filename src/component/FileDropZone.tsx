import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import {AiOutlineCloudUpload} from 'react-icons/ai';


type FileDropZoneProps = {
    onFileSelected: (files: File[]) => void;
    accept: { [key: string]: any };
    multiple: boolean;
    progress: number
};

const FileDropZone: React.FC<FileDropZoneProps> = ({onFileSelected, accept, multiple, progress}) => {
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
        accept,
        multiple
    });

    return (
        <div
            {...getRootProps()}
            className={`flex flex-col items-center justify-between w-full h-72 md:h-80 rounded-2xl spaced-dotted-border ${progress > 0 ? "none" : "cursor-pointer hover:bg-[#FEFBFE]"}`}
        >
            <div></div>

            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <AiOutlineCloudUpload size={45} color={`${progress > 0 ? "#3139B733" : "#3139B7FF"}`}/>
                <p className={`mb-2 mt-2 text-sm ${progress > 0 ? "text-[#3139B733]" : "text-[#3139B7FF]"}`}>Click or drop your files here</p>
                <input id="dropzone-file" type="file" {...getInputProps()} className="hidden"/>
            </div>
            <div className=" rounded bg-green-600 self-start h-3" style={{width: `${progress}%`}}/>

        </div>
    );
};

export default FileDropZone;
