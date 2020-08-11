import React, {useState} from "react";
import {UnmountClosed, Collapse} from "react-collapse";
import {setLayerRelativity, setLayerBackground, setLayerRadius, 
        setLayerZIndex, setLayerTransform, deleteLayer, setLayerBorder, toggleBorderView, setLayerDimensions, setLayerClipPath, setLayerPosition, applyClipPath} from "../actions/index";
import RangeInput from "./RangeInput";
import RadiusControl from "./RadiusControl";
import {createBorderRadius} from "../utils/createStyles";
import AngleInput from "./AngleInput";
import {connect} from "react-redux"
import LayerShadows from "./LayerShadows";
import GradientController from "./GradientController";
import ClipPathController from "./ClipPathController";

function SelectedLayerStyles({layer, setLayerRelativity, setLayerBackground, setLayerRadius, setLayerTransform, setLayerZIndex, setLayerBorder, toggleBorderView, setLayerDimensions, setLayerClipPath, deleteLayer, setLayerPosition, applyClipPath}){
    let [state, setState] = useState({borderRadius: false, transform: false, border: false, clipPath: false});
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
            <div className="lg-margin flex-align-center">
                <label className="label" htmlFor="layerName">div:</label>
                <input type="text" className="flex-grow text-input" id="layerName" placeholder="id"
                        value={layer.id} disabled />
                <button className="btn delete-shadow-btn" onClick={() => deleteLayer(layer.id)}><i className="fas fa-trash-alt"></i></button>
            </div>
            <div className="lg-margin flex">
                <label className="label" htmlFor="layerRelative">relative-to:</label>
                <input type="text" className="flex-grow text-input" placeholder="layer parent" 
                       value={layer.styles.relativeTo} 
                       onChange={e => setLayerRelativity(layer.id, e.target.value)} />
            </div>
            <div className="lg-margin">
                <div className="grid-col-2">
                    <div className="flex">
                        <label className="label" htmlFor="layerWidth">width:</label>
                        <input type="number" className="number-input" value={layer.styles.dimensions.width} 
                              onChange={e => setLayerDimensions(layer.id, {width: e.target.value, height: layer.styles.dimensions.height})} />
                    </div>
                    <div className="flex">
                        <label className="label" htmlFor="layerWidth">height:</label>
                        <input type="number" className="number-input" value={layer.styles.dimensions.height} 
                              onChange={e => setLayerDimensions(layer.id, {height: e.target.value, width: layer.styles.dimensions.width})} />
                    </div>
                </div>
            </div>
            <div className="lg-margin">
                <div className="grid-col-2">
                    <div className="flx-align-center">
                        <label className="label" htmlFor="top">top:</label>
                        <input type="number" className="number-input" value={layer.styles.pos.y}
                                onChange={e => setLayerPosition(layer.id, {x: layer.styles.pos.x, y: e.target.value})} />
                        %
                    </div>
                    <div className="flx-align-center">
                        <label className="label" htmlFor="top">left:</label>
                        <input type="number" className="number-input" value={layer.styles.pos.x}
                                onChange={e => setLayerPosition(layer.id, {y: layer.styles.pos.y, x: e.target.value})} />
                        %
                    </div>
                </div>
            </div>
            <div className="lg-margin flex-align-center">
                <input type="checkbox" className="checkbox" 
                        checked={layer.styles.backgroundColor.transparent} 
                        onChange={e => setLayerBackground(layer.id, "transparent", e.target.checked)} />
                <label className="label" htmlFor="layerBg">layer-background:</label>
                <input type="color" value={layer.styles.backgroundColor.color} className="color-input"
                       onChange={e => setLayerBackground(layer.id, "color", e.target.value)} />
            </div>
            <div className="lg-margin">
                <label className="label" htmlFor="layerZIndex">z-index:</label>
                <input type="number" className="number-input" value={layer.styles.zIndex}
                       onChange={e => setLayerZIndex(layer.id, e.target.value)} />
            </div>
            <div className="border-container">
                <div className="divider"></div>
                <div className="flex-space-between collapse-header">
                    <div className="flex-align-center" onClick={() => setState({...state, border: !state.border})}>
                        <i className={`fas fa-angle-right ${state.border ? "rotate" : ""}`}></i>
                        <p>border</p>
                    </div>
                    <div className="flex">
                        {
                            ["top", "right", "bottom", "left"].map((pos, i) => (
                                <button className={borderPos === pos ? "btn border-btn selected" : "btn border-btn"} 
                                        key={i}  onClick={() => setBorderPos(pos)}>
                                    {pos}
                                </button>
                            ))
                        }
                    </div>
                </div>
                <Collapse isOpened={state.border}>
                    <div className="collapse-area">
                        <div className="mg-top mg-btm flex">
                            <label className="label">width:</label>
                            <input type="number" className="number-input with-range" value={layer.styles.border[borderPos].width}
                                onChange={e => setLayerBorder(layer.id, borderPos, "width", e.target.value)} />
                            <RangeInput min={0} max={200} value={layer.styles.border[borderPos].width} 
                                    onChange={value => setLayerBorder(layer.id, borderPos, "width", value)} />
                        </div>
                        <div className="mg-top mg-btm flex-align-center">
                            <input type="checkbox" className="checkbox" checked={layer.styles.border[borderPos].transparent}
                                    onChange={e => setLayerBorder(layer.id, borderPos, "transparent", e.target.checked)} />
                            <label className="label">border-color</label>
                            <input type="color" className="color-input" value={layer.styles.border[borderPos].color}
                                    onChange={e => setLayerBorder(layer.id, borderPos, "color", e.target.value)} />
                        </div>
                        <div className="mg-top mg-btm flex-align-center">
                            <input type="checkbox" className="checkbox" checked={layer.styles.border[borderPos].hidden}
                                onChange={e => toggleBorderView(layer.id, borderPos, e.target.checked)} />
                            <label className="label">hidden</label>
                        </div>
                        <div className="flex-center mg-top mg-btm-20">
                            <button className="btn apply-for-all white-btn" onClick={applyForAll}>apply for all</button>
                        </div>
                    </div>
                </Collapse>
            </div>
            <div>
                <div className="divider"></div>
                <div className="flex-align-center collapse-header"  
                    onClick={() => setState({...state, borderRadius: !state.borderRadius})}>
                    <i className={`fas fa-angle-right ${state.borderRadius ? "rotate" : ""}`}></i>
                    <p>border-radius</p>
                </div>
                <UnmountClosed isOpened={state.borderRadius}>
                    <div className="collapsible-area">
                        <RadiusControl layer={layer} setLayerRadius={setLayerRadius} />
                        <div className="lg-margin">
                            <p className="text-center">{createBorderRadius(layer.styles.borderRadius)}</p>
                        </div>
                    </div>
                </UnmountClosed>
            </div>
            <div>
                <div className="divider"></div>
                <div className="flex-align-center collapse-header"  
                    onClick={() => setState({...state, transform: !state.transform})}>
                    <i className={`fas fa-angle-right ${state.transform ? "rotate" : ""}`}></i>
                    <p>transform</p>
                </div>
                <UnmountClosed isOpened={state.transform}>
                    <div className="collapsible-area">
                        <div className="lg-margin">
                            {
                                ["x", "y", "z"].map((direction, i) => (
                                    <div className="lg-margin flex-align-center" key={i}>
                                        <label className="label">{`rotate-${direction}`}:</label>
                                        <input type="number" className="number-input with-range" value={layer.styles.transform.rotate[direction]}
                                                onChange={e => setLayerTransform(layer.id, "rotate", direction, e.target.value)} />
                                            <AngleInput value={layer.styles.transform.rotate[direction]} 
                                                change={value => setLayerTransform(layer.id, "rotate", direction, value)} />
                                    </div>
                                ))
                            }
                        </div>
                        <div className="lg-margin">
                            {
                                ["x", "y"].map((direction, i) => (
                                    <div className="lg-margin flex-align-center" key={i}>
                                        <label className="label">{`skew-${direction}`}</label>
                                        <input type="number" className="number-input with-range" 
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
            <div className="clip-wrapper">
                <div className="divider"></div>
                <div class="flex-space-between">
                    <div className="flex-align-center collapse-header"  
                        onClick={() => setState({...state, clipPath: !state.clipPath})}>
                        <i className={`fas fa-angle-right ${state.clipPath ? "rotate" : ""}`}></i>
                        <p>clip-path</p>
                    </div>
                    <div>
                        <input type="checkbox" className="checkbox" checked={layer.styles.clipPath.checked}
                                onChange={e => applyClipPath(layer.id, e.target.checked)} />
                        <label class="label">apply</label>
                    </div>
                </div>
                <Collapse isOpened={state.clipPath}>
                    <div className="clip-tool">
                        <ClipPathController layer={layer} />
                        <p class="note text-center">*add points by clicking the box</p>
                        <p class="note text-center">*drag the points to reshape the box</p>
                    </div>
                </Collapse>
            </div>
        </div>
    )
}

export default connect(() => ({}), {setLayerRelativity, setLayerBackground, setLayerRadius, setLayerTransform, setLayerZIndex, setLayerBorder, toggleBorderView, setLayerDimensions, setLayerClipPath, deleteLayer, setLayerPosition, applyClipPath})(SelectedLayerStyles)