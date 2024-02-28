import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RecipeDetails = () => {

    const params = useParams();
    const [recipe, setRecipe] = useState(null);
    
    // Fetch the recipe
    useEffect(()=>{

       console.log(params)
    },[])

    return(
        <>
        Details Page
        </>
    )
}

export default RecipeDetails