import React from 'react';
import PresentationHeader from './PresentationHeader';
import {IPresentation} from '../util/types';
import {FullScreen} from 'react-full-screen';
import {usePresentation} from "../context/PresentationContext";
import Slider from "./SliderContainer";
import {DragDropContext, Droppable, Draggable, DropResult} from 'react-beautiful-dnd';
import ImageList from "./ImageList";


const Presentation: React.FC<IPresentation> = () => {
    const {accessibility, fullScreen, presentation} = usePresentation();

    return (
        <FullScreen handle={fullScreen}>
            <div className="mx-auto relative overflow-hidden my-10 w-full"
                 style={{height: `${accessibility && '100%'}`}}>
                {/*<PresentationHeader/>*/}
                {/*{accessibility ?*/}
                {/*    <object aria-label="PDF file" data={presentation?.mediaList &&*/}
                {/*        presentation.mediaList[0].path.replace(/&export=download/, '')}*/}
                {/*            type="application/pdf" width="100%" height="100%"*/}
                {/*            className="mt-[2rem]"*/}
                {/*    /> : <Slider/>}*/}
                <ImageList/>
            </div>
            {!fullScreen.active && (
                <div className="flex items-center justify-center">
                    <button className="bg-[#3139B7FF] rounded capitalize text-white p-2 cursor-pointer">
                        Add more media
                    </button>
                </div>
            )}
        </FullScreen>
    );
};

export default Presentation;
