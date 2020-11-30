import React, { useState } from "react"
import { BsEnvelopeFill } from 'react-icons/bs';
import { BsSearch } from 'react-icons/bs';

function FooterDisplay(props){

    const [ searchTerm, setSearchTerm ] = useState("");
    const [ placeholder ] = useState("e.g. kale, paleo");
    const yr = new Date().getFullYear();

    function handleChange(event){
        const { value } = event.target
        setSearchTerm(()=> {
            return value
        })
    }

    return (
        <div>
            <div id="search">
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
                        onTouchEnd = {(event) => { 
                            event.preventDefault()
                            return props.handleSubmit(searchTerm, event)
                        }}
                    >
                    <div><BsSearch /></div>
                    </button>
                </form>
            </div>
            <footer>
            <p>&copy; {yr} Nate Fazakerly<span style={{float: 'right'}}><a href="mailto:nate@natefaz.com"><BsEnvelopeFill style={{verticalAlign: 'middle'}} />&nbsp;contact</a></span></p>
            </footer>
        </div>
    )
}

export default FooterDisplay;