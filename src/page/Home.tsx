import React, {useState} from 'react';
import Nav from '../component/Nav';
import FileDropZone from '../component/FileDropZone';
import Header from '../component/Header';
import {IPresentationRequest} from "../util/types";
import {useMutation} from "react-query";
import {createPresentation} from "../service/presentation";


const Home: React.FC = () => {

    const handleCreatePresentation = useMutation(
        async (values: any) => {
            return await createPresentation(values)
        },
        {
            onSuccess: (response) => {
                console.log(response);
            },
            onError: (err: any) => {
                console.error(err);
            },
        }
    );

    const handleFileSelected = (files: File[]) => {
        if (files.length > 0) {
            const file = files[0];
            console.log(file)

            const presentationData: IPresentationRequest = {
                title: 'Your Presentation Title',
                file: file,
            };

            handleCreatePresentation.mutate(presentationData);
        }
    };

    // const accept = {
    //         'image/*': [],
    //         'application/pdf': [],
    //         'video/*': [],
    //         'image/svg+xml': []
    //     },


    return (
        <>
            <Nav/>
            <div className="p-4">
                <Header
                    title="Slider (LinkedIn Document Post)"
                    description="Slider is an extension of a LinkedIn document post. However, in this case, you can add gifs, small videos, and illustrations within the document after uploading your PDF. (Note: The next version will support even more features.)"
                />
                {(
                    <div className="flex items-center justify-center w-full md:w-4/6 mx-auto mt-10 md:mt-20">
                        <FileDropZone
                            multiple={false}
                            accept={{'application/pdf': []}}
                            onFileSelected={handleFileSelected}
                        /></div>
                )}

            </div>
        </>
    );
};

export default Home;
