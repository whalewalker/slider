import React from 'react';
import {motion} from 'framer-motion';
import {RiFullscreenFill} from 'react-icons/ri';
import {ISliderNavigation} from "../util/types";
import {usePresentation} from "../context/PresentationContext";


const SliderNavigation: React.FC<ISliderNavigation> = ({activeIndex, setActiveIndex, totalSlides}) => {
    const {handleFullScreen, displayPageTitle} = usePresentation();

    return (
        <motion.div
            animate={{
                opacity: displayPageTitle ? 1 : 0,
                y: displayPageTitle ? 0 : 100,
            }}
            transition={{delay: 0.2, ease: 'easeInOut', duration: 0.8}}
            className="absolute h-[3rem] bottom-0 z-10 w-full bg-[rgb(33,43,43,0.8)] text-white flex items-center px-[1rem]"
        >
            <div className="absolute bottom-4 left-[55%] z-50 flex -translate-x-2/4 w-[100%]">
                <p className="text-sm font-light text-center">{`${activeIndex + 1} / ${totalSlides}`}</p>
                <input
                    type="range"
                    className="cursor-pointer w-[80%] mx-2 range-input"
                    min="0"
                    max={totalSlides - 1}
                    step="1"
                    value={activeIndex}
                    onChange={(event) => {
                        const movedToValue = parseInt(event.target.value, 10);
                        setActiveIndex(movedToValue);
                    }}
                />
                {!handleFullScreen.active && <RiFullscreenFill color="white" width={10} className="cursor-pointer w-[70]" onClick={handleFullScreen.enter}/>}
            </div>
        </motion.div>
    );
};

export default SliderNavigation;
