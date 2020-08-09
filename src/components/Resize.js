import React from "react";
import handler from "../utils/handleMouseDown";



function Resize({resize}){
    return (
        <div className="resize-box" onMouseDown={e => handler({e, parent: document, onMove: resize})}></div>
    )
}

export default Resize;