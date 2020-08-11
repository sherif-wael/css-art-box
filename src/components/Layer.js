import React, {useRef, useState} from "react";
import handler from "../utils/handleMouseDown";
import Resize from "./Resize";
import createStyles from "../utils/createStyles"
import handleTouch from "../utils/handleTouch";

function Layer({selected, layers, layer, selectLayer, setLayerPosition, setLayerDimensions, setPos}){
    let wrapper = useRef(null);
    let onDown = () => {
        if(selected !== layer.id) selectLayer(layer.id)
    }
    let resize = ({clientX, clientY}) => {
        let {x, y} = wrapper.current.getBoundingClientRect();
        if(clientX >= x && clientY >= y){
            setLayerDimensions(layer.id, {width: Math.round(clientX - x), height: Math.round(clientY - y)});
        }
    }
    let handleMouseDown = e => {
        handler({e, parent: document, onMove: setPos, onDown})
    }
    let setChildPos = (layerId, dim) => ({clientX, clientY}) => {
        let {x, y, width, height} = wrapper.current.getBoundingClientRect();
        let left = clientX - (dim.width / 2), top = clientY - (dim.height / 2);
        let xValue = ((left - x) / width) * 100, yValue = ((top - y) / height) * 100;
        setLayerPosition(layerId, {x: Math.round(xValue), y: Math.round(yValue)})
    }
    let styles = createStyles(layer.styles)
    return (
        <div className="layer" onMouseDown={handleMouseDown} ref={wrapper} style={styles}>
            {selected === layer.id && <Resize resize={resize} onTouchStart={e => handleTouch({e, parent: document, onMove: setPos})} />}
            {
                layers.filter(l => l.styles.relativeTo === layer.id).map(lay => (
                    <Layer layer={lay} setLayerDimensions={setLayerDimensions} setLayerPosition={setLayerPosition} layers={layers}
                        selected={selected} selectLayer={selectLayer} setPos={setChildPos(lay.id, lay.styles.dimensions)} />
                ))
            }
        </div>
    )
}


export default Layer