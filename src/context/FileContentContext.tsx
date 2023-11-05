import React, {createContext, useEffect, useState, ReactNode, useContext} from 'react';

interface FileContentContextType {
    fileBlobs: Record<string, Blob | undefined>;
    setFileBlobs: (fileBlobs: Record<string, Blob | undefined>) => void;
}

const FileContentContext = createContext<FileContentContextType | undefined>(undefined);

interface FileContentProviderProps {
    children: ReactNode;
}

export const FileContentProvider: React.FC<FileContentProviderProps> = ({ children }) => {
    const [fileBlobs, setFileBlobs] = useState<Record<string, Blob | undefined>>({});

    // Load file blobs from local storage when the app starts
    useEffect(() => {
        const storedFileBlobs = localStorage.getItem('fileBlobs');
        if (storedFileBlobs) {
            setFileBlobs(JSON.parse(storedFileBlobs));
        }
    }, []);

    // Save file blobs to local storage whenever they change
    useEffect(() => {
        localStorage.setItem('fileBlobs', JSON.stringify(fileBlobs));
    }, [fileBlobs]);

    return (
        <FileContentContext.Provider value={{ fileBlobs, setFileBlobs }}>
            {children}
        </FileContentContext.Provider>
    );
};

export const useFileContent = (): FileContentContextType => {
    const context = useContext(FileContentContext);
    if (!context) {
        throw new Error('useFileContent must be used within a FileContentProvider');
    }
    return context;
};
