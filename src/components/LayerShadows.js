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
        <div className="shdaow-container">
            <div className="divider"></div>
            <div className="collapse-header flex-space-between">
                <div className="flex-align-center"  onClick={() => setState(!state)}>
                    <i className={`fas fa-angle-right ${state ? "rotate" : ""}`}></i>
                    <p>box-shadow</p>
                </div>
                <button type="button" className="btn add-shadow-btn black-btn"
                        onClick={handleClick}>
                            add
                </button>
            </div>
            <Collapse isOpened={state}>
                <div className="shadows">
                    {
                        layer.styles.shadows.map(({x, y, blur, color, spread, inset}, i) => (
                            <div className="shadow">
                                <div className="lg-margin flex-align-center">
                                    <label className="label">x:</label>
                                    <input type="number" className="number-input with-range" value={x} onChange={e => setLayerShadow(layer.id, i, "x", e.target.value)} />
                                    <RangeInput min={-100} max={100} value={x} 
                                        onChange={value => setLayerShadow(layer.id, i, "x", value)} />
                                </div>
                                <div className="lg-margin flex-align-center">
                                    <label className="label">y:</label>
                                    <input type="number" className="number-input with-range" value={y} onChange={e => setLayerShadow(layer.id, i, "y", e.target.value)} />
                                    <RangeInput min={-100} max={100} value={y} 
                                        onChange={value => setLayerShadow(layer.id, i, "y", value)} />
                                </div>
                                <div className="lg-margin flex-align-center">
                                    <label className="label">blur:</label>
                                    <input type="number" className="number-input with-range" value={blur} onChange={e => setLayerShadow(layer.id, i, "blur", e.target.value)} />
                                    <RangeInput min={0} max={100} value={blur} 
                                        onChange={value => setLayerShadow(layer.id, i, "blur", value)} />
                                </div>
                                <div className="lg-margin flex-align-center">
                                    <label className="label">spread:</label>
                                    <input type="number" className="number-input with-range" value={spread} onChange={e => setLayerShadow(layer.id, i, "spread", e.target.value)} />
                                    <RangeInput min={-100} max={100} value={spread} 
                                        onChange={value => setLayerShadow(layer.id, i, "spread", value)} />
                                </div>
                                <div className="lg-margin grid-col-2">
                                    <div className="flex">
                                        <label class="label">color:</label>
                                        <input type="color" className="color-input" value={color}
                                               onChange={e => setLayerShadow(layer.id, i, "color", e.target.value)} />
                                    </div>
                                    <div className="flex-align-center">
                                        <input type="checkbox" checked={inset} className="checkbox"
                                                    onChange={e => setLayerShadow(layer.id, i, "inset", e.target.checked)} />
                                        <label class="label">inset</label>
                                    </div>
                                </div>
                                <div className="mg-btm flex-center">
                                    <button type="button" onClick={() => deleteLayerShadow(layer.id, i)} 
                                            className="btn delete-shadow-btn">
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