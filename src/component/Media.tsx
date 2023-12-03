import React from 'react';
import { IMedia } from '../util/types';

interface MediaProps extends IMedia {}

const Media: React.FC<MediaProps> = ({ path, id}) => {
    return (
        <div className="project mx-4 cursor-pointer relative overflow-hidden">
            <img
                src={path.replace(/&export=download/, '')}
                className="h-full w-full object-cover transform transition-transform duration-400 ease-in-out hover:scale-130"
                alt={id}
            />
        </div>
    );
};

export default Media;
