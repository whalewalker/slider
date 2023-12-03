import React from "react";
import {useFullScreenHandle} from "react-full-screen";


export interface IPresentationRequest {
    title: string,
    file: File
}

interface ErrorResponse {
    errorCode: string;
    errorMessage: string;
}

export interface Response<T> {
    statusCode: string;
    responseCode: string;
    responseMessage: string;
    errors: ErrorResponse[];
    modelList: T[];
    count: number;
}

export interface IMedia {
    id: string;
    path: string;
    name: string;
    storageId: string;
    checkSum: string;
    contentType: string;
    size: number;
    position: number;
    index: number
}

export interface IPresentation {
    id?: string;
    title?: string;
    folderId?: string;
    uuid?: string;
    mediaList?: IMedia[];
}

export interface ISliderNavigation {
    activeIndex: number;
    totalSlides: number;
    setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}

export interface IPresentationContext {
    presentation: IPresentation | null;
    setPresentation: React.Dispatch<React.SetStateAction<IPresentation | null>>;
    media: IMedia | null;
    setMedia: React.Dispatch<React.SetStateAction<IMedia | null>>;
    progress: number;
    setProgress: React.Dispatch<React.SetStateAction<number>>;
    isActiveSlider: boolean;
    setIsActiveSlider: React.Dispatch<React.SetStateAction<boolean>>;
    slideIndex: number;
    setSlideIndex: React.Dispatch<React.SetStateAction<number>>;
    accessibility: boolean;
    setAccessibility: React.Dispatch<React.SetStateAction<boolean>>;
    fullScreen: ReturnType<typeof useFullScreenHandle>;

}