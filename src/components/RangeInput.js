import React from "react";





function RangeInput({max, min, value, onChange}){
    return (
        <input type="range" value={value} max={max} min={min} 
                    onChange={e => onChange(e.target.value)}   className="range-input full-width" />
    )
}

export default RangeInput