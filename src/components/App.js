import React, { useState, useEffect } from "react"
import arrRecipes from "./smoothieData"
import NavDisplay from "./NavDisplay"
import { img1, img2, img3 } from '../img/index.js'
import FooterDisplay from "./FooterDisplay"
import { BsX } from "react-icons/bs"

function App(){
    //initiate recipe state with useState:
    const [ recipe, setRecipe ] = 
        useState(()=> { 
            return (
                <div id="show"><p>Recipe will show here.
                </p></div>
                )
        })
    //smoothie image state with useState:
    const [ smoothieImg, setSmoothieImg ] = useState("")
    const blue = "#3689dc", orange = "#ff8f00", green = "#009688"
    const [ bordercolor, setBorderColor ] = useState(blue)
    const [ showHideX, setshowHideX ] = useState("none")
    const [ posX, setPosX ] = useState("x-abs")

    //only execute once after component mounts (ComponentDidMount)
    //(if second arg is empty array - if not, set to listen for a variable change):
    useEffect(()=> {
        //...
        const doc = document
        doc.onclick = (e)=> {
            const { localName, id } = e.target
            if (localName === "html" || id === "wrapper"){
                setRecipe(()=> {
                    setshowHideX("none")
                    return (
                        <div id="show"><p>Recipe will show here.</p>
                        </div>
                        )
                })
                setSmoothieImg("")
            }
        }
        doc.onkeyup = (e) => {
            const { key } = e
            if (key === 'Escape' && showHideX !== 'none'){ //if recipe is showing
                setRecipe(()=> {
                    setshowHideX("none")
                    return (
                        <div id="show"><p>Recipe will show here.</p>
                        </div>
                        )
                })
                setSmoothieImg("")
            }
        }
        doc.onscroll = () => {
            const scroll = window.scrollY
            if (scroll > 225){
                setPosX("x-fixed");
            }
            else {
                setPosX("x-abs");
            }
        }   
    }, [recipe, showHideX])
    
    function handleClick(event){
        const { value } = event.target
        
        let newRecipe = {}

        if(value === "Random"){
            newRecipe = arrRecipes[Math.floor(Math.random() * arrRecipes.length)]
            setBorderColor(orange)
        }
        else {
            let newArray = []
            for(let item of arrRecipes){
                if (item.flavor === value){
                    newArray.push(item)
                }
            }      
            newRecipe = newArray[Math.floor(Math.random() * newArray.length)]
            setBorderColor(blue)
        }
        
        const { title, flavor, ingredients, directions } = newRecipe

        if(flavor === "Sweet and Savory"){
            setSmoothieImg(()=>{
                return (
                    <img src={img1.default} alt="" />
                )
            })
        }
        else if(flavor === "Savory"){
            setSmoothieImg(()=>{
                return (
                    <img src={img2.default} alt="" />
                )
            })
        }
        else {
            setSmoothieImg(()=>{
                return (
                    <img src={img3.default} alt="" />
                )
            })
        }
        
        //setState to new state with function destructured from useState array 2nd arg 
        setRecipe(() => {
            setshowHideX("block")
            let x = 0
            return (
                <div>
                    <h2>{title}</h2>
                    <ul>
                        {ingredients.map((item) => {
                            x++
                            return <li key={x}>{ item }</li>
                        })}
                    </ul>
                    <h3>{directions}</h3>
                </div>
            )
        })

    }

    let handleSubmit = (searchTerm, e) => {
        
        setSmoothieImg("")

        const { name } = e.target
                
        if(searchTerm === "" || searchTerm === null){ //searched null
            setRecipe(()=> {
                setshowHideX("none")
                return (
                    <div id="show"><p>
                    Recipe will show here.
                    </p>
                    </div>
                    )
            })
            return
        }

        let arrKeywords = []

        //************************************************** */
            //Handle multiple search terms
        //************************************************** */

        let isMult = false
        let arrTemp = []
        let arrSearchTerms = []

        if (searchTerm.includes(",")){
            isMult = true
            arrTemp = searchTerm.split(',')
            arrTemp.forEach((item) => {
                item = item.trim() // remove whitespaces both sides
                item.replace(/\s/g, '')// remove spaces
                arrSearchTerms.push(item)
            })
        }
        
        if(name !== "all"){ //searched keyword

            setBorderColor(green)

            arrRecipes.forEach((item)=>{
                if(isMult){ //multiple search terms
                    for(let x of arrSearchTerms){
                        //if you find a match in the array ...
                        if(item.keywords.find(itm =>  
                            itm === x )){
                            arrKeywords.push(item)
                            break
                        }  
                    }
                }
                else{ //single term
                    if(item.keywords.find(itm => 
                        itm === searchTerm )){
                        arrKeywords.push(item)
                    }
                }
            })
        }

        else { //listing all
            setBorderColor(orange) 
            arrKeywords = arrRecipes //just set arrKeywords to all 
        }

        setRecipe(() => {
            setshowHideX("block")
            let x = 0 //keys
            let i = 0 //keys
            let img
            return (
                <div>
                    { arrKeywords.map((item) => {
                        if(item.flavor === "Sweet and Savory"){
                            img = img1.default
                        }
                        else if(item.flavor === "Savory"){
                            img = img2.default
                        }
                        else {
                            img = img3.default
                        }
                        x++
                        return (
                            <div key={x} className='recipe'>
                            <h2>{item.title}</h2>
                            <ul>
                                {item.ingredients.map((item) => {
                                    i++
                                    return <li key={i}>{ item }</li>
                                })}
                            </ul>
                            <h3>{item.directions}</h3>
                            <div className="smoothie-multi">
                                <img src={ img } alt="" />
                            </div>
                            <hr />
                            </div>
                        )
                    })}

                </div>
            )
        })
    }

    function handleClose(){
        setRecipe(()=> {
            setshowHideX("none")
            return (
                <div id="show"><p>Recipe will show here.</p>
                </div>
                )
        })
        setSmoothieImg("")
    }

    return( //Render Child Components
        <div 
            id="wrapper" 
            style = {{ borderColor: bordercolor }}
            className = "clearfix">
            <header className = "clearfix">
                <h1>Smoothie Mixer</h1>
                <h4>A Smoothie Generator App</h4>
                <NavDisplay
                    handleClick = { handleClick }
                    value = "test"
                />
            </header>
            <div id="container" className="clearfix">
                <div 
                    id = "x" 
                    style = {{ display: showHideX }}
                    className = { posX }
                    onClick = { handleClose } >
                <button><BsX />
                </button>
                </div>
                { recipe }
                <div className="smoothie">
                    { smoothieImg }
                </div>
            </div>
            <FooterDisplay
                handleSubmit = { handleSubmit }
            />
       </div>
    )
}

export default App