import React from 'react';
import {IMedia} from "../util/types";



const Media: React.FC<IMedia> = ({path, id, ...otherProps}) => {
    return (
        <div className="">
            <img
                src={path.replace(/&export=download/, '')}
                className="h-full w-full object-cover"
                alt={id}
            />
        </div>
    );
};

export default Media;
