import React, {useState, useRef} from "react";
import {connect} from "react-redux";
import {addClipPathPoint, deleteClipPathPoint, setClipPathPoint} from "../actions/index";
import handler from "../utils/handleMouseDown";
import {setClip} from "../utils/createStyles";
import handleTouch from "../utils/handleTouch";

function ClipPathController({layer, addClipPathPoint, deleteClipPathPoint, setClipPathPoint}){
    let [selectedPoint, selectPoint] = useState(0);
    let wrapper = useRef(null);
    let {clipPath} = layer.styles;
    let handlePointDown = index => {
        let {x, y, width, height} = wrapper.current.getBoundingClientRect();
        return ({clientX, clientY}) => {
            let pointX = clientX < x ? 0 : 100;
            let pointY = clientY < y ? 0 : 100;
            if(clientX >= x && clientX <= x + width){
                pointX = ((clientX - x) / width) * 100;
            }
            if(clientY >= y && clientY <= y + height){
                pointY = ((clientY - y) / height) * 100;
            }
            setClipPathPoint(layer.id, index, Math.round(pointX), Math.round(pointY));
        }
    }
    let addPoint = ({clientX, clientY}) => {
        let {x, y, width, height} = wrapper.current.getBoundingClientRect();
        let pointX = ((clientX - x) / width) * 100;
        let pointY = ((clientY - y) / height) * 100;
        addClipPathPoint(layer.id, Math.round(pointX), Math.round(pointY));
    }
    let deletePoint = index => {
        deleteClipPathPoint(layer.id, index);
    }
    return (
        <div className="clip-controller" ref={wrapper} onMouseDown={addPoint}>
            {
                clipPath.points.map(({x, y}, i) => (
                    <span className="clip-point flex-center" key={i}
                          style={{top: `${y}%`, left: `${x}%`}}
                          onMouseDown={e => {
                              selectPoint(i);
                              handler({e, parent: document, onMove: handlePointDown(i)})
                          }}
                          onTouchStart={e => handleTouch({e, parent: document, onMove: handlePointDown(i)})}
                          >
                        {i + 1}
                      {
                        i === selectedPoint ? 
                        <button className="delete-point-btn btn" onClick={() => deletePoint(i)}>
                            <i className="fas fa-window-close"></i>
                        </button>   :
                        null
                      }  
                    </span>
                ))
            }
            <div className="clip-result" style={{clipPath: setClip({...clipPath, apply: true})}}></div>
        </div>
    )
}



export default connect(() => ({}), {addClipPathPoint, deleteClipPathPoint, setClipPathPoint})(ClipPathController)