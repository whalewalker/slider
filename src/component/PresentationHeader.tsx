import React from 'react';
import {motion} from 'framer-motion';
import {IoCloseOutline} from "react-icons/io5";
import {Button} from "@material-tailwind/react";
import {usePresentation} from "../context/PresentationContext";
import DownloadIcon from "./DownloadIcon";

const PresentationHeader: React.FC<any> = () => {

    const {
        handleFullScreen,
        displayPageTitle,
        navigationIndex,
        setDisplayPageTitle,
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
        if (handleFullScreen.active) {
            if (displayPageTitle) {
                return 1;
            } else {
                return 0;
            }
        } else if (displayPageTitle && handleFullScreen.active) {
            return 1;
        } else if (navigationIndex === 0) {
            return 1;
        } else {
            return 0;
        }
    }

    function calculateY() {
        if (handleFullScreen.active) {
            if (displayPageTitle) {
                return 0;
            } else {
                return -100;
            }
        } else if (displayPageTitle && navigationIndex === 0) {
            return 0;
        } else {
            return -100;
        }
    }

    const closeFullScreenHandler = async () => {
        await handleFullScreen.exit();
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
            onMouseEnter={() => setDisplayPageTitle(true)}
            onMouseLeave={() => setDisplayPageTitle(false)}
        >
            <p className="font-bold">
                {presentation?.title} .{" "}
                <span className="font-normal ml-[.2rem] text-sm">
          {presentation?.mediaList?.length} pages
        </span>
            </p>

            {handleFullScreen.active && (
                <div className="flex items-center space-x-6 cursor-pointer">
                    <Button
                        variant="outlined"
                        className="capitalize rounded-none"
                        color="white"
                        onClick={toggleAccessibility}
                    >
                        Accessibility mode
                    </Button>

                    <DownloadIcon {...downloadContent}/>

                    <IoCloseOutline size="1.7rem" onClick={closeFullScreenHandler}
                    />
                </div>
            )}
        </motion.div>
    );
};

export default PresentationHeader;
