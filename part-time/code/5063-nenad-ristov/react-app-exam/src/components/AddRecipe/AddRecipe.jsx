import { useEffect, useState } from "react"
import axios from "axios"
import { redirect } from "react-router-dom"


const AddRecipe = () =>{

    const [title, setTitle] = useState("")
    const [cuisine, setCuisine] = useState("")
    const [time, setTime] = useState(0)
    const [servings, setServings] = useState(0)
    const [description, setDesc] = useState([])
    const [instructions, setInstructions] = useState([""])


    const handleTitlechange = (e) =>{
        setTitle(e.target.value)
    }
    const handlecuisineChange = (e) =>{
        setCuisine(e.target.value)
    }
    const hangleServingChange = (e) =>{
        setServings(e.target.value)
    }
    const handleTimeChange = (e) =>{
        setTime(e.target.value)
    }
    const handleDescChange = (e) =>{
        setDesc(e.target.value)
    }
    const handleInstChange = (e) =>{
        setInstructions(e.target.value)
    }

    const handleSubmit = () =>{
        let obj= {
            title:title,
            cuisine:cuisine,
            time:time,
            servings:servings,
            description:description,
            instructions:instructions
        }
        axios.post("http://localhost:2999/recipes", {
            title:title,
            cuisine:cuisine,
            time:time,
            servings:servings,
            description:description,
            instructions:instructions,
            ingredients:[]
        })
        .then(function(response){
            alert("Uspesno dodadeno!!")
            redirect("/recipes")
        })

        console.log(obj)
    }
    return(
        <>
        <h1>AddRecipe</h1>

        <form>
            <label htmlFor="title">*Title: </label>
            <input name="title" id="title" type="text" required onChange={(event) => handleTitlechange(event)}></input><br></br>

            <label htmlFor="cuisine">*Cuisine: </label>
            <input name="cuisine" id="cuisine" type="text" required onChange={(event) => handlecuisineChange(event)}></input><br />

            <label htmlFor="description" >Description</label><br/>
            <textarea id="description" rows={10} cols={50} required placeholder="*Description..." onChange={(event) => handleDescChange(event)}></textarea><br/><br/>

            <label htmlFor="description" >Instructions</label><br></br>
            <textarea id="instructions" rows={10} cols={50} placeholder="Instructions..." onChange={(event) => handleInstChange(event)}></textarea><br/>

            <label htmlFor="title">*Time: </label>
            <input name="time" id="time" type="number" required onChange={(event) => handleTimeChange(event)}></input><br></br>

            <label htmlFor="servings">*Servings: </label>
            <input name="servings" id="servings" type="number" required onChange={(event) => hangleServingChange(event)}></input><br></br>
        </form>
        <button onClick={handleSubmit}>Submit Recipe</button>
        </>
    )
}

export default AddRecipe