const styles = {
    relativeTo: "container",
    pos: {
        x: 0,
        y: 0
    },
    transform: {
        rotate: {
            x: 0, 
            y: 0,
            z: 0
        },
        skew: {
            x: 0,
            y: 0
        },
        translate: {
            z: 0
        }
    },
    borderRadius: {
        topLeft: {
            x: 0,
            y: 0
        },
        topRight: {
            x: 0,
            y: 0
        },
        bottomRight: {
            x: 0,
            y: 0
        },
        bottomLeft: {
            x: 0,
            y: 0
        },
    },
    border: {
        top: {
            color: "#000000",
            width: 0,
            hidden: false,
            style: "solid",
            transparent: false
        },
        right: {
            color: "#000000",
            width: 0,
            hidden: false,
            style: "solid",
            transparent: false
        },
        bottom: {
            color: "#000000",
            width: 0,
            hidden: false,
            style: "solid",
            transparent: false
        },
        left: {
            color: "#000000",
            width: 0,
            hidden: false,
            style: "solid",
            transparent: false
        }
    },
    shadows: [],
    backgroundColor: {
        color: "#000000",
        transparent: false
    },
    clipPath: {
        points: [{x: 20, y: 0}, {x: 80, y: 0}, {x: 100, y: 100}, {x: 0, y: 100}],
        apply: false
    },
    dimensions: {
        width: 200, 
        height: 200
    },
    zIndex: 1,
    gradient: {
        type: "linear",
        layout: {
            angle: 0
        },
        applyGradient: false,
        colors: [{color: "#020024", start: 0, opacity: 100}, {color: "#090979", start: 50}],
        repeating: false
    }
}

export default styles;