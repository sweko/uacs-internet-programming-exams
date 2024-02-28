import './Recipes.css'
import {useEffect, useState} from 'react';
import  getAllRecipes  from "./utils";
import axios from "axios";
import { Link } from 'react-router-dom';


const Recipes = () =>{

    /*useEffect(()=>{
        const resp = await getAllRecipes()
        console.log(resp)
    }, [])*/
    const [recipes, setRecipes] = useState([])

    useEffect(()=>{

        axios.get('http://localhost:2999/recipes')
        .then(function(response){
            //console.log(response.data)
            setRecipes(response.data);
        })
    },[])

    const deteleRecipe = (id) =>{
        axios.delete(`http://localhost:2999/recipes/${id}`)
             .then((res)=>{
                let newList = recipes.filter(recc => recc.id != id);
                setRecipes(newList)
             })
        console.log(id)
    }

    return(
        <>
        <h1>All Recipes</h1>
        <table border="1">
            <tr >
                <th>ID</th>
                <th>Title</th>
                <th>Cuisine</th>
                <th>Description</th>
                <th>Ingredients</th>
                <th>Instructions</th>
                <th>Time</th>
                <th>servings</th>
                <th>Action</th>
            </tr>
            {recipes.map((recipe) =>
            <tr key={recipe.id}>
                <td>{recipe.id}</td>
                <td>{recipe.title}</td>
                <td>{recipe.cuisine}</td>
                <td>{recipe.description}</td>
                <td>
                    <table>
                    {recipe.ingredients.map((ingr) =>{
                    
                       <tbody>
                        <td>{ingr.name} -- {ingr.quantity}</td>
                       </tbody> 
                    })
                    }
                    </table>
                    </td>
                <td>{recipe.instructions}</td>
                <td>{recipe.time}</td>
                <td>{recipe.servings}</td>
                <td>
                    <Link to={`recipes/${recipe.id}`}>View</Link><br></br>
                    <Link to={`recipes/${recipe.id}/edit`}>Edit</Link><br></br>
                    <p className='deteleBTN' onClick={() => deteleRecipe(recipe.id)}
                    >Delete</p>
                </td>
            </tr>
            
            )}
        </table>
        <br/>
        </>
    )
}

export default Recipes