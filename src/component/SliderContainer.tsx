import React from 'react';
import {Carousel} from "@material-tailwind/react";
import Media from "./Media";
import SliderNavigation from './SliderNavigation';
import {usePresentation} from "../context/PresentationContext";



const SliderContainer: React.FC<any> = () => {

    const {navigationIndex, setDisplayPageTitle, presentation, setNavigationIndex, setMedia} = usePresentation();

    const handleNavigation = (activeIndex: number) => {
        if (navigationIndex !== activeIndex) {
            setNavigationIndex(activeIndex);
        }
    };

    return (
        <Carousel className="w-full"
                  navigation={({activeIndex, length, setActiveIndex}) => {
                      handleNavigation(activeIndex);
                      setMedia(presentation?.mediaList?.[activeIndex] ?? null);
                      return (
                          <SliderNavigation
                              activeIndex={activeIndex}
                              setActiveIndex={setActiveIndex}
                              totalSlides={length}
                          />
                      );
                  }}
                  onMouseEnter={() => setDisplayPageTitle(true)}
                  onMouseLeave={() => setDisplayPageTitle(false)}
        >
            {presentation?.mediaList?.slice(1).map((media) => (
                <Media key={media.id} {...media} />
            ))}
        </Carousel>
    );
};

export default SliderContainer;
