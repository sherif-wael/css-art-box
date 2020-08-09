export default function touchHandler({e, onMove, parent}){
    e.preventDefautl();
    e.stopPropagation();
    let handleTouch = moveEvent => {
        onMove(moveEvent.touches[0])
    }
    parent.addEventListener("touchmove", handleTouch);
    e.addEventListener("touchend", upEvent => {
        parent.removeEventListener("touchmove", handleTouch);
        upEvent.target.ontouchend = null;
    })
    e.target.ondragstart = () => false
}