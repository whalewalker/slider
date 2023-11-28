import React from 'react';
import {Carousel} from "@material-tailwind/react";
import {ISliderContainer} from "../util/types";
import Media from "./Media";
import SliderNavigation from './SliderNavigation';



const SliderContainer: React.FC<ISliderContainer> = ({
                                                         displayPageTitle,
                                                         navigationIndex,
                                                         handle,
                                                         setNavigationIndex,
                                                         setDisplayPageTitle,
                                                         mediaItem
                                                     }) => {
    const handleNavigation = (activeIndex: number) => {
        if (navigationIndex !== activeIndex) {
            setNavigationIndex(activeIndex);
        }
    };

    return (
        <Carousel className="w-full"
                  navigation={({activeIndex, length, setActiveIndex}) => {
                      handleNavigation(activeIndex);
                      return (
                          <SliderNavigation
                              displayPageTitle={displayPageTitle}
                              activeIndex={activeIndex}
                              length={length}
                              setActiveIndex={setActiveIndex}
                              handle={handle}
                          />
                      );
                  }}
                  onMouseEnter={() => setDisplayPageTitle(true)}
                  onMouseLeave={() => setDisplayPageTitle(false)}
        >
            {mediaItem?.slice(1).map((media) => (
                <Media key={media.id} {...media} />
            ))}
        </Carousel>
    );
};

export default SliderContainer;
