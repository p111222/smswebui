import React from 'react'

import loader from "../assets/loader.gif"
import bgImage from "../assets/BG-03.jpg"

const GifLoading = () => {
    return (
        <div>
            <div
                // style={{
                //     backgroundImage: `url(${bgImage})`,
                //     backgroundPosition: "center",
                //     backgroundRepeat: "no-repeat",
                //     backgroundSize: "cover",
                //     backgroundAttachment: "fixed"
                // }}
                className={`w-full h-screen fixed top-0  left-0 z-[10000] bg-white flex 
              items-center justify-center`}
            >
                <img className="w-28 h-28" src={loader} alt="loading..." />
            </div>
        </div>
    )
}

export default GifLoading