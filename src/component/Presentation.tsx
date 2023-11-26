import React, {useState} from 'react';
import Media from './Media';
import {IPresentation} from "../util/types";
import {Carousel, slider, Slider} from "@material-tailwind/react";
import {motion} from 'framer-motion'
import media from "./Media";

const Presentation: React.FC<IPresentation> = ({mediaList, ...otherProps}) => {

    const [displayPageTitle, setDisplayPageTitle] = useState<boolean>(false)
    const [navigationIndex, setNavigationIndex] = useState<number>(0)



    const mediaLength: number = mediaList?  mediaList?.length - 1: 0

    const sliderWidth: number = Math.round(navigationIndex === 0 ? 0: (navigationIndex + 1) / mediaLength * 100)


    const handleSliderChange = (e: any) => {
        console.log(e.target.value)
        setNavigationIndex(e.target.value)
    }

    return (
        <div className="w-[50rem] mx-auto relative overflow-hidden my-10 pb-[2rem] ">
            <motion.div
                animate={{
                    opacity: displayPageTitle && navigationIndex === 0 ? 1 : 0,
                    y: displayPageTitle && navigationIndex === 0 ? 0 : -100
                }}
                transition={{delay: 0.2, ease: "easeInOut", duration: .8}}
                className={"absolute  h-[3rem]  top-0 z-10 w-full  bg-[rgb(0,0,0,0.8)] text-white flex items-center px-[1rem]"}
            >
                <p className="font-bold">
                    {otherProps.title} .
                    <span className="font-normal ml-[.2rem] text-sm">{mediaLength} pages</span>
                </p>
            </motion.div>
            <Carousel className=" w-full  " navigation={({setActiveIndex, activeIndex, length}) => {
                setNavigationIndex(activeIndex)
            }} onMouseEnter={() => {
                setDisplayPageTitle(true)
            }} onMouseLeave={() => {
                setDisplayPageTitle(false)
            }}>
                {mediaList?.slice(1).map(media => <Media key={media.id}{...media}/>)}
            </Carousel>
            <div className="w-full mt-[2rem]">
                <input type="range" className={"w-full"} max = {"100"} min={"1"} value={sliderWidth} onChange = {handleSliderChange}/>
            </div>
        </div>
    );
};

export default Presentation;
