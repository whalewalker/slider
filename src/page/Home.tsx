import React from 'react';
import Nav from "../component/Nav";
import {AiOutlineCloudUpload} from 'react-icons/ai'


const Home = () => {
    return (
        <>
            <Nav/>
            <div className="p-4">
                <header className="flex flex-col items-center w-full md:w-1/2 mx-auto mt-10 md:mt-15">
                    <h2 className="my-3 text-lg md:text-xl lg:text-[1.6rem] font-medium text-[#0D0C2D]">
                        Slider (LinkedIn Document Post)
                    </h2>
                    <p className="text-center text-gray-600 leading-6 text-sm md:text-base">
                        Slider is an extension of a LinkedIn document post. However, in this case, you can add gifs, small
                        videos, and illustrations within the document after uploading your PDF. (Note: The next version
                        will support even more features.)
                    </p>
                </header>

                <div className="flex items-center justify-center w-full md:w-2/3 mx-auto mt-10 md:mt-20">
                    <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-72 md:h-80 rounded-2xl spaced-dotted-border cursor-pointer hover:bg-[#FEFBFE]">

                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <AiOutlineCloudUpload size={45} color="#3139B7FF"/>
                            <p className="mb-2 mt-2 text-sm text-[#3139B7FF]">
                                Click or drop your file here
                            </p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden"/>
                    </label>
                </div>
            </div>
        </>
    );
};

export default Home;



