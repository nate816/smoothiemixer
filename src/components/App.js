import React, { useState, useEffect } from "react"
import arrRecipes from "./smoothieData"
import NavDisplay from "./NavDisplay"
import { img1, img2, img3 } from '../img/index.js'
import FooterDisplay from "./FooterDisplay"

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

    //only execute once after component mounts (ComponentDidMount)
    //(if second arg is empty array - if not, set to listen for a variable change):
    useEffect(()=> {
        //...
        let body = document
        body.onclick = (e)=> {
            console.log(e.target)
            const { localName, id } = e.target
            if (localName === "html" || id === "wrapper"){
                setRecipe(()=> {
                    return (
                        <div id="show"><p>Recipe will show here.</p>
                        </div>
                        )
                })
                setSmoothieImg("")
            }
        }
    }, [recipe])
    
    function handleClick(event){
        const { value } = event.target
        let newRecipe = {}

        if(value === "Random"){
            newRecipe = arrRecipes[Math.floor(Math.random() * arrRecipes.length)]
        }
        else {
            let newArray = []
            for(let item of arrRecipes){
                if (item.flavor === value){
                    newArray.push(item)
                }
            }      
            newRecipe = newArray[Math.floor(Math.random() * newArray.length)]
        }
        
        const { title, flavor, ingredients, directions } = newRecipe

        if(flavor === "Sweet and Savory"){
            setSmoothieImg(()=>{
                return (img1.default)
            })
        }
        else if(flavor === "Savory"){
            setSmoothieImg(()=>{
                return (img2.default)
            })
        }
        else {
            setSmoothieImg(()=>{
                return (img3.default)
            })
        }
        
        //setState to new state with function destructured from useState array 2nd arg 
        setRecipe(() => {
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
                
        if(searchTerm === ""){
            setRecipe(()=> {
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

        if (searchTerm.includes(",") || searchTerm.includes(", ")){
            arrTemp = searchTerm.split(',')
            isMult = true
        } else {
            isMult = false
        }
        
        arrTemp.forEach((item) => {
            item = item.trim() // remove whitespaces both sides
            item.replace(/\s/g, '')// remove spaces
            arrSearchTerms.push(item)
        })

        if(name !== "all"){ //searched keyword
            arrRecipes.forEach((item)=>{
                if(isMult){ //multiple search terms
                    for(let x = 0; x < arrSearchTerms.length; x++){
                        //if you find a match in the array ...
                        if(item.keywords.find(item =>  
                            item === arrSearchTerms[x] )){
                            arrKeywords.push(item)
                            x++
                        }  
                    }
                }
                else{
                    if(item.keywords.find(item => 
                        item === searchTerm )){
                        arrKeywords.push(item)
                    }
                }
            })
        }

        else { //listing all
            arrKeywords = arrRecipes //just set arrKeywords to all 
        }

        setRecipe(() => {
            let x = 0 //keys
            let i = 0 //keys
            let img
            return (
                <div>
                    {arrKeywords.map((item) => {
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

    return( //Render Child Components
        <div id="wrapper" className="clearfix">
            <header className="clearfix">
                <h1>Smoothie Mixer</h1>
                <h4>A Smoothie Generator App</h4>
                <NavDisplay
                    handleClick = { handleClick }
                    value = "test"
                />
            </header>
            <div id="container" className="clearfix">
                { recipe }
                <div className="smoothie">
                    <img src={ smoothieImg } alt="" />
                </div>
            </div>
            <FooterDisplay
                handleSubmit = { handleSubmit }
            />
       </div>
    )
}

export default App