import React from 'react';
import {motion} from 'framer-motion';
import {RiFullscreenFill} from 'react-icons/ri';
import {ISliderNavigation} from "../util/types";


const SliderNavigation: React.FC<ISliderNavigation> = ({
                                                               displayPageTitle,
                                                               activeIndex,
                                                               length,
                                                               setActiveIndex,
                                                               handle
                                                           }) => {
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
                <p className="text-sm font-light text-center">{`${activeIndex + 1} / ${length}`}</p>
                <input
                    type="range"
                    className="cursor-pointer w-[80%] mx-2 range-input"
                    min="0"
                    max={length - 1}
                    step="1"
                    value={activeIndex}
                    onChange={(event) => {
                        const movedToValue = parseInt(event.target.value, 10);
                        setActiveIndex(movedToValue);
                    }}
                />
                <RiFullscreenFill color="white" width={10} className="cursor-pointer w-[70]" onClick={handle.enter}/>
            </div>
        </motion.div>
    );
};

export default SliderNavigation;
