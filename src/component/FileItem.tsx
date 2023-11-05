import React, { useEffect, useState } from 'react';
import { formatFileSize } from '../util/helper';

interface FileItemProps {
    file: File;
    status: string;
    fileBlob: Blob | undefined;
    setFileBlobs: (fileBlobs: Record<string, Blob | undefined>) => void;
}

const renderBasedOnFileType = (file: File, fileBlob: Blob | undefined) => {
    if (!fileBlob) {
        return <p>File content not available.</p>;
    }

    if (file.type.startsWith('image/')) {
        return <img src={URL.createObjectURL(fileBlob)} alt={file.name} />;
    } else if (file.type === 'application/pdf') {
        return <embed src={URL.createObjectURL(fileBlob)} type="application/pdf" width="100%" height="600px" />;
    } else if (file.type === 'video/mp4') {
        return (
            <video controls width="100%" height="auto">
                <source src={URL.createObjectURL(fileBlob)} type="video/mp4" />
            </video>
        );
    } else {
        return <p>Render other file types here</p>;
    }
};


const FileItem: React.FC<FileItemProps> = ({ file, status, fileBlob, setFileBlobs }) => {
    const [progress, setProgress] = useState<number>(0);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        if (status === 'in-que') {
            const duration = 2000;
            const steps = 40;
            const stepDuration = duration / steps;
            let currentStep = 0;

            const interval = setInterval(() => {
                currentStep++;
                const newProgress = (currentStep / steps) * 100;
                setProgress(newProgress);

                if (currentStep >= steps) {
                    clearInterval(interval);
                }
            }, stepDuration);

            return () => clearInterval(interval);
        } else if (status === 'done') setProgress(100);
    }, [status]);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="border mb-5 p-2 rounded-lg cursor-pointer" onClick={toggleExpand}>
            {isExpanded ? (
                <div>
                    {fileBlob ? (
                        renderBasedOnFileType(file, fileBlob)
                    ) : (
                        <p>Loading file content...</p>
                    )}
                </div>
            ) : (
                <>
                    <p>{file.name}</p>
                    <p>{formatFileSize(file.size)}</p>
                    <p>
                        <span className="font-medium text-gray-500">Status:</span>{' '}
                        <span className={`${status === 'done' ? 'text-green-600' : 'text-orange-500'} capitalize`}>{status}</span>
                    </p>
                    <div className="w-20 bg-gray-200 rounded-full h-2.5 dark-bg-gray-700">
                        <div
                            className={`${status === 'done' ? 'bg-green-600' : 'bg-blue-600'} h-2.5 rounded-full transition-width duration-500 ease-in-out`}
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </>
            )}
        </div>
    );
};

export default FileItem;
