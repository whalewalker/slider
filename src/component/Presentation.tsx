import React, {useState} from 'react';
import Media from './Media';
import {IPresentation} from "../util/types";
import {Carousel} from "@material-tailwind/react";
import {motion} from 'framer-motion'

const Presentation: React.FC<IPresentation> = ({mediaList, ...otherProps}) => {
    const [displayPageTitle, setDisplayPageTitle] = useState<boolean>(false)
    const [navigationIndex, setNavigationIndex] = useState<number>(0);

    const mediaLength: number = mediaList ? mediaList?.length - 1 : 0

    const handleNavigation = (activeIndex: number) => {
        if (navigationIndex !== activeIndex) {
            setNavigationIndex(activeIndex);
        }
    };
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
            <Carousel className="w-full"
                      navigation={({activeIndex, length, setActiveIndex}) => {
                          handleNavigation(activeIndex);
                          Array.from({ length }, (_, index) => index);
                          return (
                              <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 w-[80%]">
                                  <input
                                      type="range"
                                      className="cursor-pointer w-full"
                                      min="0"
                                      max={length - 1}
                                      step="1"
                                      value={activeIndex}
                                      onChange={(event) => {
                                          const movedToValue = parseInt(event.target.value, 10);
                                          setActiveIndex(movedToValue);
                                      }}
                                  />
                              </div>
                          );
                      }}
                      onMouseEnter={() => setDisplayPageTitle(true)}
                      onMouseLeave={() => setDisplayPageTitle(false)}
            >
                {mediaList?.slice(1).map((media) => (
                    <Media key={media.id} {...media} />
                ))}
            </Carousel>
        </div>

    );
};

export default Presentation;
