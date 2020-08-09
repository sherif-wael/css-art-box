import React from "react";
import RangeInput from "./RangeInput";
import check from "../utils/checkCondition";
import AngleInput from "./AngleInput";

export default function GradientLayout({layerId, setGradientLayout, gradient}){
    let {type, layout} = gradient;
    if(type === "linear"){
        return (
            <div class="flex-align-center lg-margin">
                <label class="label">angle:</label>
                <input type="number" class="number-input with-range" 
                    value={layout.angle} 
                    onChange={e => setGradientLayout(layerId, "angle", e.target.value)} />
                     <AngleInput value={layout.angle}
                                    change={value => setGradientLayout(layerId, "angle", value)} />
            </div>
        )
    }
    if(type === "radial"){
        return (
            <div class="lg-margin">
                <div class="flex-align-center lg-margin">
                    <label class="label">x:</label>
                    <input type="number" class="number-input with-range" 
                            value={layout.x}
                        onChange={e => check(0, 100, e.target.value, value => setGradientLayout(layerId, "x", value))} />
                    <RangeInput min={0} max={100} value={layout.x} onChange={value => setGradientLayout(layerId, "x", value)} />
                </div>
                <div class="flex-align-center lg-margin">
                    <label class="label">y:</label>
                    <input type="number" class="number-input with-range" 
                            value={layout.y}
                        onChange={e => check(0, 100, e.target.value, value => setGradientLayout(layerId, "y", value))} />
                    <RangeInput min={0} max={100} value={layout.y} onChange={value => setGradientLayout(layerId, "y", value)} />
                </div>
            </div>
        )
    }
    if(type === "conic"){
        return (
            <div class="lg-margin">
                <div class="flex-align-center lg-margin">
                    <label class="label">angle:</label>
                    <input type="number" class="number-input with-range" 
                        value={layout.angle} 
                        onChange={e => setGradientLayout(layerId, "angle", e.target.value)} />
                        <AngleInput value={layout.angle}
                                    change={value => setGradientLayout(layerId, "angle", value)} />
                </div>
                <div class="flex-align-center lg-margin">
                    <label class="label">x:</label>
                    <input type="number" class="number-input with-range" 
                            value={layout.x}
                        onChange={e => check(0, 100, e.target.value, value => setGradientLayout(layerId, "x", value))} />
                    <RangeInput min={0} max={100} value={layout.x} onChange={value => setGradientLayout(layerId, "x", value)} />
                </div>
                <div class="flex-align-center lg-margin">
                    <label class="label">y:</label>
                    <input type="number" class="number-input with-range" 
                            value={layout.y}
                        onChange={e => check(0, 100, e.target.value, value => setGradientLayout(layerId, "y", value))} />
                    <RangeInput min={0} max={100} value={layout.y} onChange={value => setGradientLayout(layerId, "y", value)} />
                </div>
            </div>
        )
    }
}