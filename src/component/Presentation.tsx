import React, {useState} from 'react';
import SliderContainer from './SliderContainer';
import PresentationHeader from './PresentationHeader';
import {IPresentation} from '../util/types';
import {FullScreen, useFullScreenHandle} from 'react-full-screen';


const Presentation: React.FC<IPresentation> = ({mediaList, ...otherProps}) => {
    const [displayPageTitle, setDisplayPageTitle] = useState<boolean>(false);
    const [navigationIndex, setNavigationIndex] = useState<number>(0);
    const [isAccessibility, setIsAccessibility] = useState<boolean>(false);
    const handle = useFullScreenHandle();


    const mediaLength: number = mediaList ? mediaList?.length - 1 : 0;


    return (
        <FullScreen handle={handle}>
            <div className="mx-auto relative overflow-hidden my-10"
                style={{ width: `${handle.active ? '100%' : '50rem' }`, height: `${isAccessibility && '100%'}`}}>
                <PresentationHeader
                    title={otherProps.title}
                    mediaLength={mediaLength}
                    displayPageTitle={displayPageTitle}
                    navigationIndex={navigationIndex}
                    handle={handle}
                    setDisplayPageTitle={setDisplayPageTitle}
                    setIsAccessibility={setIsAccessibility}
                />

                {isAccessibility ?
                    <object aria-label="PDF file" data={mediaList && mediaList[0].path.replace(/&export=download/, '')} type="application/pdf" width="100%" height="100%"/>
                    : <SliderContainer
                        displayPageTitle={displayPageTitle}
                        navigationIndex={navigationIndex}
                        setNavigationIndex={setNavigationIndex}
                        setDisplayPageTitle={setDisplayPageTitle}
                        handle={handle}
                        mediaItem={mediaList}
                    />
                }
            </div>
        </FullScreen>
    );
};

export default Presentation;
