import React, {useState} from "react";
import  {connect} from "react-redux";
import {Collapse} from "react-collapse"
import {addLayerShadow, deleteLayerShadow, setLayerShadow} from "../actions/index";
import RangeInput from "./RangeInput";

function LayerShadows({layer, addLayerShadow, deleteLayerShadow, setLayerShadow}){
    let [state, setState] = useState(false);
    let handleClick = () => {
        addLayerShadow(layer.id);
        setState(true);
    }
    return (
        <div class="shdaow-container">
            <div class="divider"></div>
            <div class="collapse-header flex-space-between">
                <div class="flex-align-center"  onClick={() => setState(!state)}>
                    <i class={`fas fa-angle-right ${state ? "rotate" : ""}`}></i>
                    <p>box-shadow</p>
                </div>
                <button type="button" class="btn add-shadow-btn black-btn"
                        onClick={handleClick}>
                            add
                </button>
            </div>
            <Collapse isOpened={state}>
                <div class="shadows">
                    {
                        layer.styles.shadows.map(({x, y, blur, color, spread, inset}, i) => (
                            <div class="shadow">
                                <div class="lg-margin flex-align-center">
                                    <label class="label">x:</label>
                                    <input type="number" class="number-input with-range" value={x} onChange={e => setLayerShadow(layer.id, i, "x", e.target.value)} />
                                    <RangeInput min={-100} max={100} value={x} 
                                        onChange={value => setLayerShadow(layer.id, i, "x", value)} />
                                </div>
                                <div class="lg-margin flex-align-center">
                                    <label class="label">y:</label>
                                    <input type="number" class="number-input with-range" value={y} onChange={e => setLayerShadow(layer.id, i, "y", e.target.value)} />
                                    <RangeInput min={-100} max={100} value={y} 
                                        onChange={value => setLayerShadow(layer.id, i, "y", value)} />
                                </div>
                                <div class="lg-margin flex-align-center">
                                    <label class="label">blur:</label>
                                    <input type="number" class="number-input with-range" value={blur} onChange={e => setLayerShadow(layer.id, i, "blur", e.target.value)} />
                                    <RangeInput min={0} max={100} value={blur} 
                                        onChange={value => setLayerShadow(layer.id, i, "blur", value)} />
                                </div>
                                <div class="lg-margin flex-align-center">
                                    <label class="label">spread:</label>
                                    <input type="number" class="number-input with-range" value={spread} onChange={e => setLayerShadow(layer.id, i, "spread", e.target.value)} />
                                    <RangeInput min={-100} max={100} value={spread} 
                                        onChange={value => setLayerShadow(layer.id, i, "spread", value)} />
                                </div>
                                <div class="lg-margin grid-col-2">
                                    <div class="flex">
                                        <label class="label">color:</label>
                                        <input type="color" class="color-input" value={color}
                                               onChange={e => setLayerShadow(layer.id, i, "color", e.target.value)} />
                                    </div>
                                    <div class="flex-align-center">
                                        <input type="checkbox" checked={inset} class="checkbox"
                                                    onChange={e => setLayerShadow(layer.id, i, "inset", e.target.checked)} />
                                        <label class="label">inset</label>
                                    </div>
                                </div>
                                <div class="mg-btm flex-center">
                                    <button type="button" onClick={() => deleteLayerShadow(layer.id, i)} 
                                            class="btn delete-shadow-btn">
                                        <i class="fas fa-trash-alt"></i>
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </Collapse>
        </div>
    )
}


export default connect(() => ({}), {addLayerShadow, deleteLayerShadow, setLayerShadow})(LayerShadows)