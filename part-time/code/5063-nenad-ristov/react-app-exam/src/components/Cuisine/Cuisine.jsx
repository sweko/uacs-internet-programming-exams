import axios from "axios";
import { useEffect, useState } from "react";
import './Cuisines.css'


const Cuisines = () =>{


    const [recipes, setRecipes] = useState([])

    useEffect(()=>{

        axios.get('http://localhost:2999/cuisines')
        .then(function(response){
            //console.log(response.data)
            setRecipes(response.data);
        })
    },[])
    return(
        <>
        <h1>Ingredients</h1>
        {recipes.map((x) =>
        <div className="ingr">
        <p>{x}</p>
        </div>
        )}
        </>
    )
}

export default Cuisines;