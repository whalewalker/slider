import React, {ReactNode} from "react";
import {motion} from "framer-motion";
import {usePresentation} from "../context/PresentationContext";

interface SliderButtonProps {
    onClick: () => void;
    icon: ReactNode;
    className: string;
}

const SliderButton: React.FC<SliderButtonProps> = ({onClick, icon, className}) => {
    const {isActiveSlider} = usePresentation();

    return (

        <motion.div
            animate={{ opacity: isActiveSlider ? 1 : 0 }}
            transition={{delay: 0.2, ease: "easeInOut", duration: 0.8}}
        >
            <button
                onClick={onClick}
                className={`w-9 h-9 bg-[rgba(0,0,0,0.8)] rounded-full cursor-pointer text-white absolute top-1/2 hover:bg-black ${className}`}
            >
                {icon}
            </button>
        </motion.div>

    )
};


export default SliderButton;

