import { Outlet, Link } from "react-router-dom"
import './navbar.css'
const Navbar = () =>{

    return(
        <>
        <div id="navbar">
            <ul>
                <li><Link to={"/"}>Home </Link></li>
                <li><Link to={"recipes/"}>View Recipes</Link></li>
                <li><Link to={'/recipes/create'}>Add recipe</Link></li>
                <li><Link to={'ingredients'}>View Ingredients</Link></li>
                <li><Link to={'cuisines'}>View Cuisines</Link></li>
                <li><Link to={"about"}>About</Link></li>
                <li><Link to={"statistics"} >Statistics</Link></li>
            </ul>
        </div>
        <Outlet/>
        <div id="footer">
            <p>React Application for the exam for Internet Programming</p><br />
            <p>Nenad Ristov 5063</p>
        </div>
        </>
    )
}

export default Navbar