import React, {useEffect, useState} from 'react';
import Nav from '../component/Nav';
import Header from '../component/Header';
import {IPresentation, IPresentationRequest} from "../util/types";
import {useMutation} from "react-query";
import {createPresentation} from "../service/presentationService";
import Presentation from "../component/Presentation";
import FileDropZone from "../component/FileDropZone";
import {usePresentation} from "../context/PresentationContext";
import Slider from "react-slick";


const Home: React.FC = () => {
    const [progress, setProgress] = useState<number>(0);
    const {presentation, setPresentation} = usePresentation();

    function SampleNextArrow(props: any) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", background: "red" }}
                onClick={onClick}
            />
        );
    }

    function SamplePrevArrow(props: any) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", background: "green" }}
                onClick={onClick}
            />
        );
    }

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 3,
        speed: 500,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    const mutation = useMutation(
        async (values: any) => {
            return await createPresentation(values);
        },
        {
            onSuccess: (response) => {
                localStorage.setItem("presentation", JSON.stringify(response.data.modelList[0]));
                setPresentation(response.data.modelList[0]);
            },
            onError: (err: any) => {
                console.error(err);
            },
        }
    );

    useEffect(() => {
        if (mutation.status === "loading") {
            const duration = 2000;
            const steps = 100;
            const stepDuration = duration / steps;
            let currentStep = 0;

            const interval = setInterval(() => {
                currentStep++;
                const newProgress = (currentStep / steps) * 90;
                setProgress(newProgress);

                if (currentStep >= steps) {
                    clearInterval(interval);
                }
            }, stepDuration);

            return () => clearInterval(interval);
        } else if (mutation.status === 'success') setProgress(100);
    }, [mutation.status]);


    useEffect(() => {
        const presentationJson = localStorage.getItem("presentation");

        if (presentationJson) {
            const presentation: IPresentation = JSON.parse(presentationJson);
            setPresentation(presentation);
        }
    }, []);



    const handleFileSelected = (files: File[]) => {
        if (files.length > 0) {
            const file = files[0];

            const presentationData: IPresentationRequest = {
                title: 'Your Presentation Title',
                file: file,
            };

            mutation.mutate(presentationData);
        }
    };

    // const accept = {
    //         'image/*': [],
    //         'application/pdf': [],
    //         'video/*': [],
    //         'image/svg+xml': []
    //     },


    return (
        <>
            <Nav/>
            <div className="p-4">
                <Header
                    title="Slider (LinkedIn Document Post)"
                    description="Slider is an extension of a LinkedIn document post. However, in this case, you can add gifs, small videos, and illustrations within the document after uploading your PDF. (Note: The next version will support even more features.)"
                />
                {presentation == null && (
                    <div className={`flex items-center justify-center w-full md:w-4/6 mx-auto mt-10 md:mt-20`}>
                        <FileDropZone
                            multiple={false}
                            accept={{'application/pdf': []}}
                            onFileSelected={handleFileSelected}
                            progress={progress}
                        /></div>
                )}
                    {/*<Presentation/>*/}
            </div>

            <div className="border ">
                <h2>Center Mode</h2>
                <Slider {...settings}>
                    <div>
                        <h3>1</h3>
                    </div>
                    <div>
                        <h3>2</h3>
                    </div>
                    <div>
                        <h3>3</h3>
                    </div>
                    <div>
                        <h3>4</h3>
                    </div>
                    <div>
                        <h3>5</h3>
                    </div>
                    <div>
                        <h3>6</h3>
                    </div>
                </Slider>
            </div>
        </>
    )
};

export default Home;
