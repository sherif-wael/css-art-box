import React, {useRef, useState} from "react";
import handler from "../utils/handleMouseDown";
// import {setLayerRadius} from "../actions/index";
import {connect} from "react-redux";
import {createBorderRadius} from "../utils/createStyles"
import handleTouch from "../utils/handleTouch";

let spans = [
    {
        border: "topLeft",
        pos: "x",
        from: "left",
        fixed: {top: "0"},
        translate: "translate(-50%, -50%)"
    },
    {
        border: "topLeft",
        pos: "y",
        from: "top",
        fixed: {left: "0"},
        translate: "translate(-50%, -50%)"
    },
    {
        border: "topRight",
        pos: "x",
        from: "right",
        fixed: {top: "0"},
        translate: "translate(50%, -50%)"
    },
    {
        border: "topRight",
        pos: "y",
        from: "top",
        fixed: {left: "100%"},
        translate: "translate(-50%, -50%)"
    },
    {
        border: "bottomRight",
        pos: "x",
        from: "right",
        fixed: {top: "100%"},
        translate: "translate(50%, -50%)"
    },
    {
        border: "bottomRight",
        pos: "y",
        from: "bottom",
        fixed: {left: "100%"},
        translate: "translate(-50%, 50%)"
    },
    {
        border: "bottomLeft",
        pos: "x",
        from: "left",
        fixed: {top: "100%"},
        translate: "translate(-50%, -50%)"
    },
    {
        border: "bottomLeft",
        pos: "y",
        from: "bottom",
        fixed: {left: 0},
        translate: "translate(-50%, 50%)"
    }
]

function RadiusControl({layer, setLayerRadius}){
    let [state, setState] = useState({border: "topLeft", pos: "x"});
    let wrapper = useRef(null)
    let func = (id, border, pos, from) => ({clientX, clientY}) => {
        let {x, y, width, height} = wrapper.current.getBoundingClientRect();
        let value = pos === "x" ? (clientX < x ? 0 : 100) : (clientY < y ? 0 : 100); 
        if(pos === "x" && clientX <= x + width && clientX >= x){
             value = ((clientX - x) / width) * 100;
        }else if(pos === "y" && clientY <= y + height && clientY > y){
             value = ((clientY - y) / width) * 100;
        }
        value = from === "right" || from === "bottom" ? 100 - value : value;
        setLayerRadius(id, border, pos, Math.round(value))
    }
    let selectSpan = (border, pos) => {
        setState({border, pos});
    }
    let applyForAll = () => {
        spans.forEach(({border, pos}) => {
            setLayerRadius(layer.id, border, pos, layer.styles.borderRadius[state.border][state.pos]);
        })
    }
    return (
    <div>
        <div className="text-center">
            <label className="label">{state.border}-{state.pos}:</label>
            <input type="number" className="number-input with-range" 
                    value={layer.styles.borderRadius[state.border][state.pos]}
                    onChange={e => setLayerRadius(layer.id, state.border, state.pos, e.target.value)}
                    palcegholder="%" />
            <button className="btn apply-for-all white-btn" onClick={applyForAll}>apply for all</button>
        </div>
        <div ref={wrapper} className="radius-controller">
            {
                spans.map(({border, pos, fixed, from, translate}, key) => {
                    let fixedPos = Object.keys(fixed)[0];
                    let callback = func(layer.id, border, pos, from);
                    let styles = {
                            [from]: `${layer.styles.borderRadius[border][pos]}%`,
                            [fixedPos]: fixed[fixedPos],
                            transform: translate
                        }
                    return <span className="radius-span" 
                                 style={styles} 
                                onMouseDown={e => {
                                    selectSpan(border, pos)
                                    handler({e, parent: document, onMove: callback})
                                }} key={key}
                                onTouchStart={e => {
                                    selectSpan(border, pos)
                                    handleTouch({e, parent: document, onMove: callback})
                                }}
                                ></span>
                })
            }
            <div className="radius-illustration" style={{borderRadius: createBorderRadius(layer.styles.borderRadius)}}></div>
        </div>
    </div>
    )
}




export default RadiusControl