import React, {useRef} from "react";
import {connect} from "react-redux";
import {selectLayer, setLayerPosition, setLayerDimensions} from "../actions/index";
import Layer from "./Layer";

function Playground({container, layers, selected, selectLayer, setLayerDimensions, setLayerPosition}){
    let playground = useRef(null);
    let setPos = (layerId, dim) => ({clientX, clientY}) => {
        let {x, y, width, height} = playground.current.getBoundingClientRect();
        let left = clientX - (dim.width / 2), top = clientY - (dim.height / 2);
        setLayerPosition(layerId, {x: Math.round(((left - x) / width) * 100), y: Math.round(((top - y) / height) * 100)});
    }
    let handleMouseDown = e => {
        e.preventDefault();
        e.stopPropagation();
        selectLayer(null);
    }
    let styles = {backgroundColor: container.backgroundColor, perspective: `${container.perspective}px`};
    return (
        <div class="playground" style={styles} ref={playground} onMouseDown={handleMouseDown}>
            {
                layers.filter(layer => layer.styles.relativeTo === "container" || 
                              !layers.some(l => l.id === layer.styles.relativeTo)).map(layer => (
                                <Layer layer={layer} selectLayer={selectLayer} layers={layers}
                                    setLayerDimensions={setLayerDimensions} setLayerPosition={setLayerPosition}
                                    selected={selected} setPos={setPos(layer.id, layer.styles.dimensions)}/>
                              ))
            }
        </div>
    )
}


function mapStateToProps(state){
    return {
        container: state.container,
        layers: state.layers,
        selected: state.selected
    }
}

export default connect(mapStateToProps, {selectLayer, setLayerPosition, setLayerDimensions})(Playground)