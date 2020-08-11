import React, {useState} from "react";
import {addLayer, setContainerStyles, resetState} from "../actions/index";
import {connect} from "react-redux";
import {withRouter} from "react-router";


function ContainerValues({container, addLayer, setContainerStyles, layers, history, resetState}){
    let [name, setName] = useState("");
    let handleClick = value => {
        if(!value || value === "container" || layers.some(layer => layer.id === value)){
            alert("enter a valid layer id")
        }else{
            addLayer(value)
            setName("");
        }
    }
    return (
        <div>
            <div className="container-header flex-center">
                <h2>CONTAINER</h2>
            </div>
            <div className="lg-margin flex-align-center">
                <label className="label" htmlFor="containerBg">background-color:</label>
                <input type="color" id="containerBg" value={container.backgroundColor} className="color-input"
                        onChange={e => setContainerStyles("backgroundColor", e.target.value)} />
            </div>
            <div className="lg-margin flex-align-center">
                <label className="label" htmlFor="containerPerspecive">perspective:</label>
                <input type="number" id="containerPerspective" className="number-input" 
                        onChange={e => setContainerStyles("perspective", e.target.value)} />
            </div>
            <div className="flex lg-margin">
                <input type="text" className="flex-grow text-input" onChange={e => setName(e.target.value)} value={name} placeholder="An ID for the div" />
                <button onClick={() => handleClick(name)} className="add-layer-btn btn white-btn">add div</button>
            </div>
            <div className="flex-center lg-margin">
                <button className="btn view-code-btn black-btn" onClick={() => history.push("/code")}>code</button>
                <button className="btn reset-btn white-btn" onClick={resetState}>reset</button>
            </div>
            <div className="divider lg-margin"></div>
        </div>
    )
}

function mapStateToProps(state){
    return {
        container: state.container,
        layers: state.layers
    }
}

export default connect(mapStateToProps, {addLayer, setContainerStyles, resetState})(withRouter(ContainerValues))