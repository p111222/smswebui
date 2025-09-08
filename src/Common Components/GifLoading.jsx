import React, { useContext } from 'react'

import { AppStore } from "../Store/appStore.jsx";
import { spinnerImageData } from '../utils/imageBase64Data.js';
import "./Loader.css";

const GifLoading = () => {

    const { loading } = useContext(AppStore);
    console.log("loading"+loading);

    if (!loading) return null;

    return (
        <div className="loader-container">
            <svg
                className="spinning-loader"
                width="903"
                height="873"
                viewBox="0 0 903 873"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect y="-30" width="903" height="903" fill="url(#pattern0_30_56)" />
                <defs>
                    <pattern
                        id="pattern0_30_56"
                        patternContentUnits="objectBoundingBox"
                        width="1"
                        height="1"
                    >
                        <use
                            xlinkHref="#image0_30_56"
                            transform="scale(0.000976562)"
                        />
                    </pattern>
                    <image
                        id="image0_30_56"
                        width="1024"
                        height="1024"
                        preserveAspectRatio="none"
                        xlinkHref={spinnerImageData}
                    />
                </defs>
            </svg>
        </div>
    )
}

export default GifLoading