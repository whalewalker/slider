import React, {useState} from 'react';
import Nav from '../component/Nav';
import FileDropZone from '../component/FileDropZone';
import Header from '../component/Header';
import FileItem from '../component/FileItem';
import {FileItemType, FileStatus} from '../util/types';
import {useFileContent} from '../context/FileContentContext';


const Home: React.FC = () => {
    const [fileItems, setFileItems] = useState<FileItemType[]>([]);
    const {fileBlobs, setFileBlobs} = useFileContent();

    const handleFileSelected = (files: File[]) => {
        const newFileItems = files.map((file) => ({file, status: 'in-que' as FileStatus}));

        // Update file blobs in context
        const updatedFileBlobs = {...fileBlobs};

        // Create and store the blob for each file
        newFileItems.forEach((item) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const result = event.target?.result;
                if (result) {
                    // Store the created Blob in the updatedFileBlobs
                    updatedFileBlobs[item.file.name] = new Blob([result], {type: item.file.type});
                    setFileBlobs(updatedFileBlobs);
                }
            };
            reader.readAsArrayBuffer(item.file);
        });

        setFileItems((prevFileItems) => [...prevFileItems, ...newFileItems]);

        setTimeout(() => {
            setFileItems((prevFileItems) =>
                prevFileItems.map((item) =>
                    files.includes(item.file) ? {...item, status: 'done' as FileStatus} : item
                )
            );
        }, 2000);
    };


    const isUploadSectionVisible = fileItems.length === 0;

    return (
        <>
            <Nav/>
            <div className="p-4">
                <Header
                    title="Slider (LinkedIn Document Post)"
                    description="Slider is an extension of a LinkedIn document post. However, in this case, you can add gifs, small videos, and illustrations within the document after uploading your PDF. (Note: The next version will support even more features.)"
                />
                {isUploadSectionVisible && (
                    <div className="flex items-center justify-center w-full md:w-4/6 mx-auto mt-10 md:mt-20">
                        <FileDropZone onFileSelected={handleFileSelected}/>
                    </div>
                )}

                <div className="mt-8 w-full md:w-1/2 mx-auto">
                    {fileItems.map((fileItem, index) => (
                        <FileItem
                            key={index}
                            file={fileItem.file}
                            status={fileItem.status}
                            fileBlob={fileBlobs[fileItem.file.name]}
                            setFileBlobs={setFileBlobs}
                        />
                    ))}
                </div>

            </div>
        </>
    );
};

export default Home;
