import React from "react";
import video from "../images/video.mp4";

export default function HowToUse(){
    return (
        <div className="video-wrapper">
            <h2>HOW TO USE CSS TOOLS</h2>
            <video className="video"  src={video} controls autoplay />
        </div>
    )
}

