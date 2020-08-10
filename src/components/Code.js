import React from "react";
import {connect} from "react-redux";
import getHtmlCode from "../utils/getHtmlCode";
import getCssCode from "../utils/getCssCode"


function Code({layers, container, history}){
    let htmlCode = getHtmlCode(layers, "container", 0);
    let cssCode = getCssCode(layers, container);
    return (
        <div className="code-page">
            <button onClick={() => history.goBack()} className="btn go-back">
                <i className="fas fa-long-arrow-alt-left"></i>
            </button>
            <div className="pre">
                <h3>HTML</h3>
                <pre dangerouslySetInnerHTML={{__html: htmlCode}}>
                </pre>
            </div>
            <div className="pre">
                <h3>CSS</h3>
                <pre dangerouslySetInnerHTML={{__html: cssCode}}>
                </pre>
            </div>
        </div>
    )
}

function mapStateToProps(state){
    return {
        layers: state.layers,
        container: state.container
    }
}

export default connect(mapStateToProps)(Code);