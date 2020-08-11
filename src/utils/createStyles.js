import {setGradient} from "./gradientMethods";

function createStyles(layerStyles){
    const styles = {};
    let {pos, transform, borderRadius, border, shadows, backgroundColor, clipPath, dimensions, zIndex, gradient} = layerStyles;
    styles.top = `${pos.y}%`;
    styles.left = `${pos.x}%`;
    styles.borderTop = createBorder(border.top);
    styles.borderRight = createBorder(border.right);
    styles.borderBottom = createBorder(border.bottom);
    styles.borderLeft = createBorder(border.left);
    styles.borderRadius = createBorderRadius(borderRadius);
    styles.transform = createTransform(transform);
    styles.clipPath = setClip(clipPath);
    styles.width = `${dimensions.width}px`;
    styles.height = `${dimensions.height}px`;
    styles.boxShadow = createShadows(shadows);
    styles.zIndex = zIndex;
    styles.background = gradient.applyGradient ?  setGradient(gradient) : backgroundColor.transparent ? "transparent" : backgroundColor.color;
    return styles;
}

function createBorder(props){
    return props.hidden ? 
              "none" :
              `${props.width}px ${props.style} ${props.transparent ? "transparent" : props.color}`;
}


export function createBorderRadius({topLeft, topRight, bottomRight, bottomLeft}){
    return `${topLeft.x}% ${topRight.x}% ${bottomRight.x}% ${bottomLeft.x}% / ${topLeft.y}% ${topRight.y}% ${bottomRight.y}% ${bottomLeft.y}%`
}

function createTransform({rotate, skew}){
    let rotate3d = `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) rotateZ(${rotate.z}deg)`;
    let skewMethod = `skew(${skew.x}deg, ${skew.y}deg)`;
    return `${rotate3d} ${skewMethod}`
}

function createShadows(shadows){
    let shadow =  shadows.map(({x, y, inset, blur, color, spread}) => {
        let path = inset ? "inset" : "";
        return `${path} ${x}px ${y}px ${blur}px ${spread}px ${color}`
    }).join(", ")
    return shadow
}

export function setClip({points, apply}, forcss){
    if(points.length === 0 || !apply){
        return forcss ? "" : "none";
    }
    let value = points.map(({x, y}) => {
        return `${x}% ${y}%`
    }).join(", ");
    return `polygon(${value})`;
}

// create css style format


export function setLayerBgColor({gradient, backgroundColor}){
    return gradient.applyGradient ? setGradient(gradient) : backgroundColor.transparent ? "transparent" : backgroundColor.color;
}


export function setLayerTransform(transform){
    let value = "";
    for(let method of Object.keys(transform)){
        for(let direction of Object.keys(transform[method])){
            if(transform[method][direction]){
                value += `${method}${direction.toUpperCase()}(${transform[method][direction]}deg) `;
            }
        }
    }
    return value ? `${value.trim()}` : "";
}

export function setLayerShadows(shadows){
    if(shadows.length === 0){
        return "";
    }
    return `${createShadows(shadows)}`
}


export function setLayerRadius(borderRadius){
    if(Object.keys(borderRadius).every(borderPos => 
            Object.keys(borderRadius[borderPos]).every(pos => borderRadius[borderPos][pos] === 0))){
        return ""
    }
    return `${createBorderRadius(borderRadius)}`; 
}

export function setLayerBorder(border, pos){
    let {hidden, width, color, style, transparent} = border[pos];
    if(width === 0 && !hidden){
        return "";
    }
    if(hidden){
        return "none"
    }else{
        return `${width}px ${style} ${transparent ? "transparent" : color}`
    }
}

export function setLayerZIndex(zIndex){
    return zIndex === 1 ? "" : `${zIndex}`
}


export default createStyles;
