import React from 'react';
import SliderContainer from './SliderContainer';
import PresentationHeader from './PresentationHeader';
import {IPresentation} from '../util/types';
import {FullScreen} from 'react-full-screen';
import {usePresentation} from "../context/PresentationContext";


const Presentation: React.FC<IPresentation> = () => {
    const {accessibility, handleFullScreen, presentation} = usePresentation();

    return (
        <FullScreen handle={handleFullScreen}>
            <div className="mx-auto relative overflow-hidden my-10"
                 style={{width: `${handleFullScreen.active ? '100%' : '50rem'}`, height: `${accessibility && '100%'}`}}>
                <PresentationHeader/>
                {accessibility ?
                    <object aria-label="PDF file" data={presentation?.mediaList &&
                        presentation.mediaList[0].path.replace(/&export=download/, '')}
                            type="application/pdf" width="100%" height="100%"
                            className="mt-[2rem]"
                    />
                    : <SliderContainer/>
                }
            </div>
        </FullScreen>
    );
};

export default Presentation;
