import React, {useRef, useState} from "react";
import {connect} from "react-redux";
import {setLayerGradient, changeGradientType, setGradientLayout, addGradientColor, deleteGradientColor, setGradientColor} from "../actions/index";
import handler from "../utils/handleMouseDown";
import {Collapse} from "react-collapse";
import {setGradient} from "../utils/gradientMethods"
import GradientLayout from "./GradientLayout";

function GradientController({layer, setLayerGradient, changeGradientType, setGradientLayout, addGradientColor, deleteGradientColor, setGradientColor}){
    let [selectedColor, selectColor] = useState(0);
    let [state, setState] = useState(false);
    let bar = useRef(null);
    let {gradient} = layer.styles;
    let handleMove = index => ({clientX}) => {
        let {x, width} = bar.current.getBoundingClientRect();
        let start = clientX < x  ? 0 : 100;
        if(clientX >= x && clientX <= x + width){
            start = ((clientX - x)/ width) * 100;
        }
        setGradientColor(layer.id, index, "start", Math.round(start))
    }
    let addColor = ({clientX}) => {
        let {x, width} = bar.current.getBoundingClientRect();
        if(clientX >= x && clientX <= x + width){
            let start = ((clientX - x) / width) * 100;
            addGradientColor(layer.id, Math.round(start));
            selectColor(gradient.colors.length);
        }
    }
    let deleteSelectedColor = () => {
        if(gradient.colors.length > 2){
            selectColor(selectedColor ? selectedColor - 1 : gradient.colors.length - 2);
            deleteGradientColor(layer.id, selectedColor)
        }
    }
    return (
        <div class="gradient-controller">
            <div class="divider"></div>
            <div class="collapse-header flex-space-between">
                <div class="flex-align-center" onClick={() => setState(!state)}>
                    <i class={`fas fa-angle-right ${state.transform ? "rotate" : ""}`}></i>
                    <p>background</p>
                </div>
                <div class="flex-align-center">
                    <input type="checkbox" class="checkbox" checked={gradient.applyGradient}
                                    onChange={e => setLayerGradient(layer.id, "applyGradient", e.target.checked)} />
                    <label class="label">apply</label>
                    <input type="checkbox" class="checkbox" checked={gradient.repeating}
                                    onChange={e => setLayerGradient(layer.id, "repeating", e.target.checked)} />
                    <label class="label">repeat</label>
                </div>
            </div>
            <Collapse isOpened={state}>
               <div class="gradient-wrapper">
                    <div class="flex-center type-tabs">
                        {
                            ["linear", "radial", "conic"].map((type, i) => (
                                <div onClick={() => changeGradientType(layer.id, type)}
                                     className={type === gradient.type ? "selected" : ""}   >
                                    {type}
                                </div>
                            ))
                        }
                    </div>
                    <GradientLayout gradient={gradient} layerId={layer.id} setGradientLayout={setGradientLayout} />
                    <div class="gradient-bar" ref={bar} onMouseDown={addColor}
                        style={{background: setGradient(gradient)}}>
                        {
                            gradient.colors.map((color, i) => (
                                <span onMouseDown={e => {
                                    selectColor(i);
                                    handler({e, parent: document, onMove: handleMove(i)})
                                }}
                                style={{left: `${color.start}%`}} key={i}
                                className={selectedColor === i ? "selected controller" : "controller"}
                                >
                                    <span class="start-value">{color.start}</span>
                                </span>
                            ))
                        }
                    </div>
                    <div class="selected-color-controls flex-space-between">
                        <div class=" flex-align-center lg-margin">
                            <label class="label">color:</label>
                            <input type="color" class="color-input" value={gradient.colors[selectedColor].color}
                                    onChange={e => setGradientColor(layer.id, selectedColor, "color", e.target.value)} />
                        </div>
                        <div>
                            <button class="btn delete-shadow-btn" onClick={deleteSelectedColor}>
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </Collapse>
        </div>
    )
}

export default connect(() => ({}), {setLayerGradient, changeGradientType, setGradientLayout, addGradientColor, deleteGradientColor, setGradientColor})(GradientController)