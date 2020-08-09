import React, {useRef} from "react";
import {Transition} from "react-transition-group";

const defaultStyles = {
    transition: "height 200ms ease",
    overflow: "hidden",
    backgroundColor: "red",
    height: "0px"
}


function Collapse({children, expanded}){
    let wrapper = useRef(null);
    let stateHandler = state => {
       switch(state){
           case "entering": 
            return {height: "0px"}
           case "entered":
            return {height: `${wrapper.current.scrollHeight}px`}
           case "exiting": 
            return {height: `${wrapper.current.scrollHeight}px`}
           case "exited":
            return {height: `0px`}
       }
    }
    return(
        <Transition in={expanded} timouut={500}>
            {
                state => (
                    <div ref={wrapper} style={{...defaultStyles, ...stateHandler(state)}}>
                        {
                            children
                        }
                    </div>
                   )
            }
        </Transition>
    )
}

export default Collapse