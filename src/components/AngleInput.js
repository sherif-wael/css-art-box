import React, {useRef} from "react";
import handler from "../utils/handleMouseDown";
import handleTouch from "../utils/handleTouch";

function AngleInput({change, value}){
    let wrapper = useRef(null);
    let callback = ({clientX, clientY}) => {
        let {x, y, width, height} = wrapper.current.getBoundingClientRect();
        let centerX = x + width / 2, centerY = y + height / 2;
        let value  = Math.atan2(clientX - centerX, clientY - centerY) * -1;
        let angle = ((180 * value) / Math.PI) + 90;
        angle = angle < 0 ? 360 + angle : angle;
        change(Math.round(angle));
    }
    return (
        <div className="angle-input touch" ref={wrapper} onTouchStart={e => handleTouch({e, parent: document, onMove: callback})}
            style={{transform: `rotate(${value}deg)`}}
            onMouseDown={e => handler({e, parent: document, onMove: callback})} >
        </div>
    )
}


export default AngleInput
