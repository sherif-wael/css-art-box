import React from "react";
import video from "../images/video.mp4";
import {Link} from "react-router-dom";

export default function HowToUse(){
    return (
        <div className="video-wrapper">
            <h2>HOW TO USE CSS TOOLS</h2>
            <div className="to-playground">
                Visit the <Link to="/playground">playground</Link> and start drawing
            </div>
            <video className="video"  src={video} controls autoplay />
        </div>
    )
}

