function comapreStart(a, b){
    if(a.start < b.start){
        return -1
    }else{
        return 1
    }
}

export function setGradient({colors, layout, repeating, type}){
    let colorSteps = colors.slice().sort(comapreStart).map(({color, start}) => `${color} ${start}%`).join(", ");
   if(type === "linear"){
       let value = `linear-gradient(${layout.angle}deg, ${colorSteps})`;
       return repeating ? `repeating-${value}` : value
   }
   if(type === "radial"){
       let {x, y} = layout;
       let value = `radial-gradient(circle at ${x}% ${y}%, ${colorSteps})`;
       return repeating ? `repeating-${value}` : value
   }
   let {angle, x, y} = layout;
   let value = `conic-gradient(from ${angle}deg at ${x}% ${y}%, ${colorSteps})`;
   return repeating ? `repeating-${value}` : value;
}