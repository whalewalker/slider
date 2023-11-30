import React, { createContext, useContext, ReactNode, useState, useMemo } from 'react';
import {IMedia, IPresentation, IPresentationContext} from '../util/types';
import {useFullScreenHandle} from "react-full-screen";


const PresentationContext = createContext<IPresentationContext | undefined>(undefined);

export const PresentationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [presentation, setPresentation] = useState<IPresentation | null>(null);
    const [media, setMedia] = useState<IMedia | null>(null);
    const [progress, setProgress] = useState<number>(0);
    const [displayPageTitle, setDisplayPageTitle] = useState<boolean>(false);
    const [navigationIndex, setNavigationIndex] = useState<number>(0);
    const [accessibility, setAccessibility] = useState<boolean>(false);
    const handle = useFullScreenHandle();


    const contextValue = useMemo(
        () => ({
            presentation,
            setPresentation,
            progress,
            setProgress,
            displayPageTitle,
            setDisplayPageTitle,
            navigationIndex,
            setNavigationIndex,
            accessibility: accessibility,
            setAccessibility: setAccessibility,
            handleFullScreen: handle,
            media: media,
            setMedia: setMedia
        }),
        [presentation, setPresentation, progress, setProgress, displayPageTitle, setDisplayPageTitle, navigationIndex, setNavigationIndex, accessibility, setAccessibility, handle, setMedia, media]
    );

    return (
        <PresentationContext.Provider value={contextValue}>
            {children}
        </PresentationContext.Provider>
    );
};

export const usePresentation = () => {
    const context = useContext(PresentationContext);
    if (!context) {
        throw new Error('usePresentation must be used within a PresentationProvider');
    }
    return context;
};
