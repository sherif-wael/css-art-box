export default function handler({e, parent, onMove}){
    // e.preventDefault();
    e.stopPropagation();
    let handleMove = moveEvent => {
        onMove(moveEvent.touches[0]);
    }
    parent.addEventListener("touchmove", handleMove);
    e.target.addEventListener("touchend", upEvent => {
        parent.removeEventListener("touchmove", handleMove);
        upEvent.target.ontouchend = null;
    })
    e.target.ondragstart = () => false;
}