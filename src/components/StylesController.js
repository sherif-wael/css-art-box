import React from "react";
import {connect} from "react-redux";
import selected from "../reducers/selected";
import ContainerValues from "./ContainerValues";
import SelectedLayerStyles from "./SelectedLayerStyles";


function StylesController({selected, layers}){
    let layer = selected ? layers.find(l => l.id === selected) : null;
    return (
        <div className="styles-controller">
            <ContainerValues />
            {
                layer 
                &&
                <SelectedLayerStyles layer={layer} />
            }
        </div>
    )
}

function mapStateToProps(state){
    return {
        selected: state.selected,
        layers: state.layers
    }
}

export default connect(mapStateToProps)(StylesController)