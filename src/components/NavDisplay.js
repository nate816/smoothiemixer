import React from "react";

function NavDisplay(props){ // SENDING props object to be declared in render.
    return(
            <div className="nav clearfix">
                <button
                    value="Sweet"
                    className="nav-left" 
                    title="sweet smoothies"
                    onClick={props.handleClick}
                >
                Sweet
                </button>
                <button
                    value="Savory"
                    className="nav-mid" 
                    title="savory smoothies"
                    onClick={props.handleClick}
                >
                Savory
                </button>
                <button
                    value="Sweet and Savory" 
                    className="nav-mid" 
                    title="sweet &amp; savory smoothies"
                    onClick={props.handleClick}
                >
                Sweet &amp; Savory
                </button>
                <button
                    value="Random" 
                    className="nav-right" 
                    title="totally random smoothie"
                    onClick={props.handleClick}
                >
                Random
                </button>
            </div>
    )
}

export default NavDisplay;