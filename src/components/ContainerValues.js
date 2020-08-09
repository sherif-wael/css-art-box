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
            <div class="container-header flex-center">
                <h2>CONTAINER</h2>
            </div>
            <div class="lg-margin flex-align-center">
                <label class="label" htmlFor="containerBg">background-color:</label>
                <input type="color" id="containerBg" value={container.backgroundColor} class="color-input"
                        onChange={e => setContainerStyles("backgroundColor", e.target.value)} />
            </div>
            <div class="lg-margin flex-align-center">
                <label class="label" htmlFor="containerPerspecive">perspective:</label>
                <input type="number" id="containerPerspective" class="number-input" 
                        onChange={e => setContainerStyles("perspective", e.target.value)} />
            </div>
            <div class="flex lg-margin">
                <input type="text" class="flex-grow text-input" onChange={e => setName(e.target.value)} value={name}/>
                <button onClick={() => handleClick(name)} class="add-layer-btn btn white-btn">add layer</button>
            </div>
            <div class="flex-center lg-margin">
                <button class="btn view-code-btn black-btn" onClick={() => history.push("/code")}>code</button>
                <button class="btn reset-btn white-btn" onClick={resetState}>reset</button>
            </div>
            <div class="divider lg-margin"></div>
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