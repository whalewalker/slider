import React from 'react';
import Media from './Media';
import {IPresentation} from "../util/types";
import {Carousel} from "@material-tailwind/react";
import {motion} from 'framer-motion'


const Presentation: React.FC<IPresentation> = ({mediaList, ...otherProps}) => {
    return (
        <>
            <motion.div

            >

            </motion.div>
            <Carousel className="rounded-xl w-[50rem] mx-auto my-10">
                {mediaList?.slice(1).map(media => <Media key={media.id}{...media}/>)}
            </Carousel>
        </>
    );
};

export default Presentation;
