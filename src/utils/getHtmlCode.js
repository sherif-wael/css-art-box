import {setLayerBgColor, setLayerTransform, setLayerShadows, setLayerClipPath, setLayerRadius, setLayerBorder, setLayerZIndex} from "./createStyles";


export function space(n){
    return "  ".repeat(n);
}

export function span(str, cl){
    return `<span class=${cl}>${str}</span>`
}

export default function createHtmlCode(layers, id, lvl){
    let childLayers;
    if(id === "container"){
        childLayers = layers.filter(layer => layer.styles.relativeTo === "container" || 
                                            !layers.some(l => l.id === layer.styles.relativeTo))
    }else{
        childLayers = layers.filter(layer => layer.styles.relativeTo === id);
    }
    if(!childLayers.length){
        return `${space(lvl)}${span("<", "tag")}${span("div", "tag")} ${span("id", "attr")}="${span(id, "attr-value")}"${span(">", "tag")}${span("<", "tag")}${span("/div", "tag")}${span(">", "tag")}`
    }else{
        return (
            `${space(lvl)}${span("<", "tag")}${span("div", "tag")} ${span("id", "attr")}="${span(id, "attr-value")}"${span(">", "tag")} 
${childLayers.map(layer => createHtmlCode(layers, layer.id, lvl + 1)).join("\n")}
${space(lvl)}${span("<", "tag")}${span("/div", "tag")}${span(">", "tag")}`
        )
    }
}





// export function createCssCode(layers, container){
//     let containerStyles = 
// `${span(`#container`, "selector")} {
//     ${span("background-color", "prop")}: ${span(container.backgroundColor, "value")};
//     ${span("position", "prop")}: ${span("relative", "value")};
//     ${span("perspective", "prop")}: ${span(`${container.perspective}px`, "value")};
// }
//     `
//     let layersStyles = layers.map(layer => (
//         `
// ${span(`#${layer.id}`, "selector")} {
//     position: absolute;
//     top: ${layer.styles.pos.y}%;
//     left: ${layer.styles.pos.x}%;
//     background-color: ${setLayerBgColor(layer.styles.backgroundColor)};
//     width: ${layer.styles.dimensions.width}px;
//     height: ${layer.styles.dimensions.height}px;
//     ${setLayerTransform(layer.styles.transform)}
//     ${setLayerShadows(layer.styles.shadows)}
//     ${setLayerClipPath(layer.styles.clipPath)}
//     ${setLayerRadius(layer.styles.borderRadius)}
//     ${setLayerBorder(layer.styles.border)}
//     ${setLayerZIndex(layer.styles.zIndex)}
// }
//         `
//     )).join("\n");
//     return  `${containerStyles}
//              ${layersStyles}`

// }