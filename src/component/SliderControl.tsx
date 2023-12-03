import {motion} from "framer-motion";
import {RiFullscreenFill} from "react-icons/ri";
import React from "react";
import {usePresentation} from "../context/PresentationContext";

interface SliderControlsProps {
    mediaListLength: number;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SliderControl: React.FC<SliderControlsProps> = ({mediaListLength, handleInputChange,}) => {
    const {fullScreen, slideIndex, isActiveSlider} = usePresentation();


    return (
        <motion.div
            animate={{
                opacity: isActiveSlider ? 1 : 0,
                y: isActiveSlider ? 0 : 100,
            }}
            transition={{delay: 0.2, ease: "easeInOut", duration: 0.8}}
            className="absolute mx-auto h-[3rem] bottom-0 z-10 w-full bg-[rgb(33,43,43,0.8)] text-white flex items-center"
        >
            <div className="flex items-center justify-evenly w-[80%] mx-auto">
                <p className="text-sm font-light text-center">{`${slideIndex + 1} / ${mediaListLength - 1}`}</p>
                <input
                    type="range"
                    className="cursor-pointer w-[80%] range-input"
                    min="0"
                    max={mediaListLength - 2}
                    step="1"
                    value={slideIndex}
                    onChange={handleInputChange}
                />
                {!fullScreen.active && (
                    <RiFullscreenFill
                        color="white"
                        size="1rem"
                        className="cursor-pointer"
                        onClick={fullScreen.enter}
                    />
                )}
            </div>
        </motion.div>
    )
};

export default SliderControl;
