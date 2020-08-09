import React, {useState} from "react";
import {UnmountClosed, Collapse} from "react-collapse";
import {setLayerRelativity, setLayerBackground, setLayerRadius, 
        setLayerZIndex, setLayerTransform, deleteLayer, setLayerBorder, toggleBorderView, setLayerDimensions, setLayerClipPath} from "../actions/index";
import RangeInput from "./RangeInput";
import RadiusControl from "./RadiusControl";
import {createBorderRadius} from "../utils/createStyles";
import AngleInput from "./AngleInput";
import {connect} from "react-redux"
import LayerShadows from "./LayerShadows";
import GradientController from "./GradientController";

function SelectedLayerStyles({layer, setLayerRelativity, setLayerBackground, setLayerRadius, setLayerTransform, setLayerZIndex, setLayerBorder, toggleBorderView, setLayerDimensions, setLayerClipPath, deleteLayer}){
    let [state, setState] = useState({borderRadius: false, transform: false, border: false});
    let [borderPos, setBorderPos] = useState("top");
    let applyForAll = () => {
        ["top", "right", "bottom", "left"].filter(pos => pos !== borderPos).forEach(pos => {
            ["width", "color", "transparent"].forEach(prop => {
                setLayerBorder(layer.id, pos, prop, layer.styles.border[borderPos][prop])
            })
        })
    }
    return (
        <div>
            <div class="lg-margin flex-align-center">
                <label class="label" htmlFor="layerName">layer:</label>
                <input type="text" class="flex-grow text-input" id="layerName" placeholder="id"
                        value={layer.id} disabled />
                <button class="btn delete-shadow-btn" onClick={() => deleteLayer(layer.id)}><i class="fas fa-trash-alt"></i></button>
            </div>
            <div class="lg-margin flex">
                <label class="label" htmlFor="layerRelative">relative-to:</label>
                <input type="text" class="flex-grow text-input" placeholder="layer parent" 
                       value={layer.styles.relativeTo} 
                       onChange={e => setLayerRelativity(layer.id, e.target.value)} />
            </div>
            <div class="lg-margin">
                <div class="grid-col-2">
                    <div class="flex">
                        <label class="label" htmlFor="layerWidth">width:</label>
                        <input type="number" class="number-input" value={layer.styles.dimensions.width} 
                              onChange={e => setLayerDimensions(layer.id, {width: e.target.value, height: layer.styles.dimensions.height})} />
                    </div>
                    <div class="flex">
                        <label class="label" htmlFor="layerWidth">height:</label>
                        <input type="number" class="number-input" value={layer.styles.dimensions.height} 
                              onChange={e => setLayerDimensions(layer.id, {height: e.target.value, width: layer.styles.dimensions.width})} />
                    </div>
                </div>
            </div>
            <div class="lg-margin flex-align-center">
                <input type="checkbox" class="checkbox" 
                        checked={layer.styles.backgroundColor.transparent} 
                        onChange={e => setLayerBackground(layer.id, "transparent", e.target.checked)} />
                <label class="label" htmlFor="layerBg">layer-background:</label>
                <input type="color" value={layer.styles.backgroundColor.color} class="color-input"
                       onChange={e => setLayerBackground(layer.id, "color", e.target.value)} />
            </div>
            <div class="lg-margin">
                <label class="label" htmlFor="layerZIndex">z-index:</label>
                <input type="number" class="number-input" value={layer.styles.zIndex}
                       onChange={e => setLayerZIndex(layer.id, e.target.value)} />
            </div>
            <div class="lg-margin">
                <label class="label" htmlFor="layerClip">clip-path:</label>
                <input type="text" class="text-input" value={layer.styles.clipPath} 
                       placeholder="eg.polygon()" onChange={e => setLayerClipPath(layer.id, e.target.value)} />
            </div>
            <div class="border-container">
                <div class="divider"></div>
                <div class="flex-space-between collapse-header">
                    <div class="flex-align-center" onClick={() => setState({...state, border: !state.border})}>
                        <i class={`fas fa-angle-right ${state.border ? "rotate" : ""}`}></i>
                        <p>border</p>
                    </div>
                    <div class="flex">
                        {
                            ["top", "right", "bottom", "left"].map(pos => (
                                <button class={borderPos === pos ? "btn border-btn selected" : "btn border-btn"} 
                                            onClick={() => setBorderPos(pos)}>
                                    {pos}
                                </button>
                            ))
                        }
                    </div>
                </div>
                <Collapse isOpened={state.border}>
                    <div class="collapse-area">
                        <div class="mg-top mg-btm flex">
                            <label class="label">width:</label>
                            <input type="number" class="number-input with-range" value={layer.styles.border[borderPos].width}
                                onChange={e => setLayerBorder(layer.id, borderPos, "width", e.target.value)} />
                            <RangeInput min={0} max={200} value={layer.styles.border[borderPos].width} 
                                    onChange={value => setLayerBorder(layer.id, borderPos, "width", value)} />
                        </div>
                        <div class="mg-top mg-btm flex-align-center">
                            <input type="checkbox" class="checkbox" checked={layer.styles.border[borderPos].transparent}
                                    onChange={e => setLayerBorder(layer.id, borderPos, "transparent", e.target.checked)} />
                            <label class="label">border-color</label>
                            <input type="color" class="color-input" value={layer.styles.border[borderPos].color}
                                    onChange={e => setLayerBorder(layer.id, borderPos, "color", e.target.value)} />
                        </div>
                        <div class="mg-top mg-btm flex-align-center">
                            <input type="checkbox" class="checkbox" checked={layer.styles.border[borderPos].hidden}
                                onChange={e => toggleBorderView(layer.id, borderPos, e.target.checked)} />
                            <label class="label">hidden</label>
                        </div>
                        <div class="flex-center mg-top mg-btm-20">
                            <button class="btn apply-for-all white-btn" onClick={applyForAll}>apply for all</button>
                        </div>
                    </div>
                </Collapse>
            </div>
            <div>
                <div class="divider"></div>
                <div class="flex-align-center collapse-header"  
                    onClick={() => setState({...state, borderRadius: !state.borderRadius})}>
                    <i class={`fas fa-angle-right ${state.borderRadius ? "rotate" : ""}`}></i>
                    <p>border-radius</p>
                </div>
                <UnmountClosed isOpened={state.borderRadius}>
                    <div class="collapsible-area">
                        <RadiusControl layer={layer} setLayerRadius={setLayerRadius} />
                        <div class="lg-margin">
                            <p class="text-center">{createBorderRadius(layer.styles.borderRadius)}</p>
                        </div>
                    </div>
                </UnmountClosed>
            </div>
            <div>
                <div class="divider"></div>
                <div class="flex-align-center collapse-header"  
                    onClick={() => setState({...state, transform: !state.transform})}>
                    <i class={`fas fa-angle-right ${state.transform ? "rotate" : ""}`}></i>
                    <p>transform</p>
                </div>
                <UnmountClosed isOpened={state.transform}>
                    <div class="collapsible-area">
                        <div class="lg-margin">
                            {
                                ["x", "y", "z"].map((direction, i) => (
                                    <div class="lg-margin flex-align-center">
                                        <label class="label">{`rotate-${direction}`}:</label>
                                        <input type="number" class="number-input with-range" value={layer.styles.transform.rotate[direction]}
                                                onChange={e => setLayerTransform(layer.id, "rotate", direction, e.target.value)} />
                                            <AngleInput value={layer.styles.transform.rotate[direction]} 
                                                change={value => setLayerTransform(layer.id, "rotate", direction, value)} />
                                    </div>
                                ))
                            }
                        </div>
                        <div class="lg-margin">
                            {
                                ["x", "y"].map((direction, i) => (
                                    <div class="lg-margin flex-align-center">
                                        <label class="label">{`skew-${direction}`}</label>
                                        <input type="number" class="number-input with-range" 
                                                value={layer.styles.transform.skew[direction]}
                                                onChange={e => setLayerTransform(layer.id, "skew", direction, e.target.value)} />
                                        <AngleInput value={layer.styles.transform.skew[direction]} 
                                                change={value => setLayerTransform(layer.id, "skew", direction, value)} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </UnmountClosed>
            </div>
            <LayerShadows layer={layer} />
            <GradientController layer={layer} />
        </div>
    )
}

export default connect(() => ({}), {setLayerRelativity, setLayerBackground, setLayerRadius, setLayerTransform, setLayerZIndex, setLayerBorder, toggleBorderView, setLayerDimensions, setLayerClipPath, deleteLayer})(SelectedLayerStyles)