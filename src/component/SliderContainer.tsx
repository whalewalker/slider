import React, {ChangeEvent, useRef} from "react";
import {usePresentation} from "../context/PresentationContext";
import SliderControl from "./SliderControl";
import Media from "./Media";
import Slider from "react-slick";
import SliderButton from "./SliderButton";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";

const SliderContainer: React.FC = () => {
    const {presentation, setSlideIndex, setIsActiveSlider, fullScreen} = usePresentation();
    const sliderRef = useRef<any>(null);
    const mediaListLength = presentation?.mediaList?.length || 0;


    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (sliderRef.current) {
            sliderRef.current.slickGoTo(parseInt(e.target.value, 10));
        }
    };


    const breakpoint = {
        sm: 500,
        md: 700,
        xl: fullScreen.active ? window.innerWidth : 0
    };

    let settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        speed: 500,
        dots: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        arrows: false,
        centerPadding: '0',
        dotsClass: "slick-dots slick-thumb",
        beforeChange: (_: any, next: any) => setSlideIndex(next),
        responsive: [
            {
                breakpoint: breakpoint.sm,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: false
                }
            },
            {
                breakpoint: breakpoint.md,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                    centerMode: false
                }
            },
            {
                breakpoint: breakpoint.xl,
                settings: {
                    infinite: false,
                    dots: false,
                    speed: 500,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 0,
                    arrows: false,
                }
            },

        ]
    };


    return (
        <div className="relative" onMouseEnter={() => setIsActiveSlider(true)}
             onMouseLeave={() => setIsActiveSlider(false)}>
            <SliderButton onClick={() => sliderRef.current?.slickPrev()} icon={<IoIosArrowBack className="mx-auto"/>}
                          className="z-10 left-10 transform -translate-y-1/2"/>

            <Slider ref={(slider) => (sliderRef.current = slider)} {...settings}>
                {presentation?.mediaList?.slice(1).map((media) => (
                    <Media key={media.id} {...media} />
                ))}
            </Slider>
            <SliderControl
                mediaListLength={mediaListLength}
                handleInputChange={handleInputChange}
            />
            <SliderButton onClick={() => sliderRef.current?.slickNext()} icon={<IoIosArrowForward className="mx-auto"/>}
                          className="right-10 transform -translate-y-1/2"/>
        </div>
    );
};

export default SliderContainer;
