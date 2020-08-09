import React from "react";
import RangeInput from "./RangeInput";
import check from "../utils/checkCondition";
import AngleInput from "./AngleInput";

export default function GradientLayout({layerId, setGradientLayout, gradient}){
    let {type, layout} = gradient;
    if(type === "linear"){
        return (
            <div className="flex-align-center lg-margin">
                <label className="label">angle:</label>
                <input type="number" className="number-input with-range" 
                    value={layout.angle} 
                    onChange={e => setGradientLayout(layerId, "angle", e.target.value)} />
                     <AngleInput value={layout.angle}
                                    change={value => setGradientLayout(layerId, "angle", value)} />
            </div>
        )
    }
    if(type === "radial"){
        return (
            <div className="lg-margin">
                <div className="flex-align-center lg-margin">
                    <label className="label">x:</label>
                    <input type="number" className="number-input with-range" 
                            value={layout.x}
                        onChange={e => check(0, 100, e.target.value, value => setGradientLayout(layerId, "x", value))} />
                    <RangeInput min={0} max={100} value={layout.x} onChange={value => setGradientLayout(layerId, "x", value)} />
                </div>
                <div className="flex-align-center lg-margin">
                    <label className="label">y:</label>
                    <input type="number" className="number-input with-range" 
                            value={layout.y}
                        onChange={e => check(0, 100, e.target.value, value => setGradientLayout(layerId, "y", value))} />
                    <RangeInput min={0} max={100} value={layout.y} onChange={value => setGradientLayout(layerId, "y", value)} />
                </div>
            </div>
        )
    }
    if(type === "conic"){
        return (
            <div className="lg-margin">
                <div className="flex-align-center lg-margin">
                    <label className="label">angle:</label>
                    <input type="number" className="number-input with-range" 
                        value={layout.angle} 
                        onChange={e => setGradientLayout(layerId, "angle", e.target.value)} />
                        <AngleInput value={layout.angle}
                                    change={value => setGradientLayout(layerId, "angle", value)} />
                </div>
                <div className="flex-align-center lg-margin">
                    <label className="label">x:</label>
                    <input type="number" className="number-input with-range" 
                            value={layout.x}
                        onChange={e => check(0, 100, e.target.value, value => setGradientLayout(layerId, "x", value))} />
                    <RangeInput min={0} max={100} value={layout.x} onChange={value => setGradientLayout(layerId, "x", value)} />
                </div>
                <div className="flex-align-center lg-margin">
                    <label className="label">y:</label>
                    <input type="number" className="number-input with-range" 
                            value={layout.y}
                        onChange={e => check(0, 100, e.target.value, value => setGradientLayout(layerId, "y", value))} />
                    <RangeInput min={0} max={100} value={layout.y} onChange={value => setGradientLayout(layerId, "y", value)} />
                </div>
            </div>
        )
    }
}