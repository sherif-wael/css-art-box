import {space, span} from "./getHtmlCode";
import {setLayerBgColor, setLayerTransform, setLayerShadows, setLayerClipPath, setLayerRadius, setLayerBorder, setLayerZIndex} from "./createStyles";


function setContainerProps(container){
    return [
        {
            prop: "background-color",
            value: container.backgroundColor
        },
        {
            prop: "position",
            value: "relative"
        },
        {
            prop: "perspective",
            value: container.perspective
        },
        {
            prop: "height",
            value: "100vh"
        }
    ]
}

function setLayerProps(layer){
    return [
        {
            prop: "position",
            value: "absolute"
        },
        {
            prop: "top",
            value: `${layer.styles.pos.y}%`
        },
        {
            prop: "left",
            value: `${layer.styles.pos.x}%`
        },
        {
            prop: "width",
            value: `${layer.styles.dimensions.width}px`
        },
        {
            prop: "height",
            value: `${layer.styles.dimensions.height}px`
        },
        {
            prop: "background",
            value: setLayerBgColor(layer.styles)
        },
        {
            prop: "z-index",
            value: setLayerZIndex(layer.styles.zIndex)
        },
        {
            prop: "transform",
            value: setLayerTransform(layer.styles.transform)
        },
        {
            prop: "box-shadow",
            value: setLayerShadows(layer.styles.shadows)
        },
        {
            prop: "border-radius",
            value: setLayerRadius(layer.styles.borderRadius)
        },
        {
            prop: "clip-path",
            value: setLayerClipPath(layer.styles.clipPath)
        },
        {
            prop: "border-top",
            value: setLayerBorder(layer.styles.border, "top")
        },
        {
            prop: "border-right",
            value: setLayerBorder(layer.styles.border, "right")
        },
        {
            prop: "border-bottom",
            value: setLayerBorder(layer.styles.border, "bottom")
        },
        {
            prop: "border-left",
            value: setLayerBorder(layer.styles.border, "left")
        }
    ]
}


function containerStyles(container){
    let containerStyles = setContainerProps(container).map(({prop, value}) => {
        return `${space(1)}${span(prop, "prop")}: ${span(value, "value")};`
    }).join("\n")
    return (
`${span("#container", "selector")} {
${containerStyles}
}
`
    )
}

function layerStyles(layer){
    let layerStyles = setLayerProps(layer)
                            .filter(({value}) => value !== "") 
                            .map(({prop, value}) => {
                               return  `${space(1)}${span(prop, "prop")}: ${span(value, "value")};`
                            }).join("\n")
    return (
`${span(`#${layer.id}`, "selector")} {
${layerStyles}
}
`
    )
}


function cssCode(layers, container){
    let containerCode = containerStyles(container);
    let layersCode = layers.map(layer => {
        return layerStyles(layer);
    }).join("\n");
    return (
`${containerCode}
${layersCode}
`        
    )
}

export default cssCode;