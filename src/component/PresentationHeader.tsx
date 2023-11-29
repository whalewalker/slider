import React from 'react';
import { motion } from 'framer-motion';
import { IPresentationHeader } from "../util/types";
import { Button } from "@material-tailwind/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";


const PresentationHeader: React.FC<IPresentationHeader> = ({
    title,
    mediaLength,
    displayPageTitle,
    navigationIndex,
    handle,
    setDisplayPageTitle,
    setIsAccessibility
}) => {


    return (
        <motion.div
            animate={{
                opacity: handle.active ? (displayPageTitle ? 1 : 0) : (displayPageTitle && handle.active ? 1 : navigationIndex === 0 ? 1 : 0),
                y: handle.active ? (displayPageTitle ? 0 : -100) : (displayPageTitle && navigationIndex === 0 ? 0 : -100)
            }}
            transition={{ delay: 0.2, ease: "easeInOut", duration: 0.8 }}
            className="absolute top-0 z-10 w-full bg-[rgb(0,0,0,0.8)] text-white flex items-center justify-between px-[1rem] py-[0.5rem]"

            onMouseEnter={() => setDisplayPageTitle(true)}
            onMouseLeave={() => setDisplayPageTitle(false)}
        >
            <p className="font-bold">
                {title} . <span className="font-normal ml-[.2rem] text-sm">{mediaLength} pages</span>
            </p>

            {handle.active &&
                <div className="flex items-center space-x-4 cursor-pointer">
                    <Button variant="outlined" className="capitalize rounded-none" color="white"
                        onClick={() => setIsAccessibility(true)}>Accessibility
                        mode</Button>
                    <BsThreeDotsVertical size="1.3rem" />
                    <IoCloseOutline size="1.7rem" onClick={() => setIsAccessibility(false)} />
                </div>
            }
        </motion.div>
    );
};

export default PresentationHeader;
