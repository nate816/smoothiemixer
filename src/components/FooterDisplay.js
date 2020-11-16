import React, { useState } from "react"

function FooterDisplay(props){

    const [ searchTerm, setSearchTerm ] = useState("");
    const [ placeholder ] = useState("e.g. kale, paleo");

    function handleChange(event){
        const { value } = event.target
        setSearchTerm(()=> {
            return value
        })
    }


    return (
        <div id="search" className="clearfix">
            <div className="search-left">
                <button
                    className="listAllBtn"
                    name="all"
                    onClick = {(event) => { 
                        event.preventDefault()
                        return props.handleSubmit("all", event)
                    }}
                >
                List all smoothies
                </button>
            </div>
        
            <div className="search-right">
                <form>
                    <input 
                        value = { searchTerm }
                        placeholder = { placeholder }
                        onChange = { handleChange }
                    >
                    </input>
                    <button
                        type="submit"
                        className="searchBtn" 
                        title="search ingredients"
                        onClick = {(event) => { 
                            event.preventDefault()
                            return props.handleSubmit(searchTerm, event)
                        }}
                    >
                    <div className="sbtn">Search</div>
                    </button>
                </form>
            </div>
            
        </div>
    )
}

export default FooterDisplay;