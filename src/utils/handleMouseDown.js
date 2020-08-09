function handler({e, parent, onMove, onDown = null, onUp = null}){
    if(onDown) onDown();
    e.preventDefault();
    e.stopPropagation()
    if(e.button !== 0) return;
    //to handle mousemove events for calc required values
    let handleMove = (e) => {
        if(e.buttons === 0){
            parent.removeEventListener("mousemove", handleMove);
        }
        onMove(e)
    }
    parent.addEventListener("mousemove", handleMove)
    e.target.addEventListener("mouseup", (upEvent) => {
        parent.removeEventListener("mousemove", handleMove)
        if(onUp) onUp()
        upEvent.target.onmouseup = null;
    })
    e.target.ondragstart = () => false;
}

export default handler;
