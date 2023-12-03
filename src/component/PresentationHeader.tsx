import React from 'react';
import {motion} from 'framer-motion';
import {IoCloseOutline} from "react-icons/io5";
import {usePresentation} from "../context/PresentationContext";
import DownloadIcon from "./DownloadIcon";

const PresentationHeader: React.FC<any> = () => {

    const {
        fullScreen,
        isActiveSlider,
        slideIndex,
        setIsActiveSlider,
        presentation,
        setAccessibility,
        media,
        accessibility
    } = usePresentation();


    const headerAnimation = {
        opacity: calculateOpacity(),
        y: calculateY(),
    };

    const downloadContent = {
        contentType: accessibility ? "application/pdf" : media?.contentType ?? "",
        fileName: accessibility ? presentation?.title ?? "" : media?.name ?? "",
        content: accessibility ? presentation?.folderId ?? "" : media?.path ?? ""
    };


    function calculateOpacity() {
        if (fullScreen.active) {
            if (isActiveSlider) {
                return 1;
            } else {
                return 0;
            }
        } else if (isActiveSlider && fullScreen.active) {
            return 1;
        } else if (slideIndex === 0) {
            return 1;
        } else {
            return 0;
        }
    }

    function calculateY() {
        if (fullScreen.active) {
            if (isActiveSlider) {
                return 0;
            } else {
                return -100;
            }
        } else if (isActiveSlider && slideIndex === 0) {
            return 0;
        } else {
            return -100;
        }
    }

    const closeFullScreenHandler = async () => {
        await fullScreen.exit();
        setAccessibility(false);
    };

    const toggleAccessibility = () => {
        setAccessibility(!accessibility)
    }

    return (
        <motion.div
            animate={!accessibility && headerAnimation}
            transition={{delay: 0.2, ease: "easeInOut", duration: 0.8}}
            className={`${accessibility ? 'fixed' : 'absolute z-10'} top-0 w-full bg-[rgb(0,0,0,0.8)] text-white flex items-center justify-between px-[1rem] py-[0.5rem]`}
            onMouseEnter={() => setIsActiveSlider(true)}
            onMouseLeave={() => setIsActiveSlider(false)}
        >
            <p className="font-bold">
                {presentation?.title} .{" "}
                <span className="font-normal ml-[.2rem] text-sm">
          {presentation?.mediaList?.length && presentation?.mediaList?.length - 1} pages
        </span>
            </p>

            {fullScreen.active && (
                <div className="flex items-center space-x-6 cursor-pointer">
                    <button
                        className="capitalize rounded-none border-white text-white"
                        onClick={toggleAccessibility}
                    >
                        Accessibility mode
                    </button>

                    <DownloadIcon {...downloadContent}/>

                    <IoCloseOutline size="1.7rem" onClick={closeFullScreenHandler}
                    />
                </div>
            )}
        </motion.div>
    );
};

export default PresentationHeader;
