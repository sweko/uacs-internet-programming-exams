import axios from "axios";

const getAllRecipes = () =>{
    let data = {}
    const result =  axios.get('http://localhost:2999/recipes')
    .then(function(response){
        console.log(response.data)
        data = response.data
        return data;
    })
    //console.log(data)
    return result
}

export default getAllRecipes;
