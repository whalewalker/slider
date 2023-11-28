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

export interface ISliderContainer{
    displayPageTitle: boolean;
    navigationIndex: number;
    setNavigationIndex: React.Dispatch<React.SetStateAction<number>>;
    setDisplayPageTitle: React.Dispatch<React.SetStateAction<boolean>>;
    handle: ReturnType<typeof useFullScreenHandle>;
    mediaItem?: IMedia[]
}

export interface IPresentationHeader {
    title?: string;
    mediaLength: number;
    displayPageTitle: boolean;
    navigationIndex: number;
    handle: ReturnType<typeof useFullScreenHandle>;
    setDisplayPageTitle: React.Dispatch<React.SetStateAction<boolean>>;
    setIsAccessibility: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ISliderNavigation {
    displayPageTitle: boolean;
    activeIndex: number;
    length: number;
    setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
    handle: ReturnType<typeof useFullScreenHandle>;
}