import React from "react";
import handler from "../utils/handleMouseDown";



function Resize({resize}){
    return (
        <div class="resize-box" onMouseDown={e => handler({e, parent: document, onMove: resize})}></div>
    )
}

export default Resize;