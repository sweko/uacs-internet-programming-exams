import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import AboutUs from './components/About/About';
import Ingedients from './components/Ingredients/Ingredients';
import Recipes from './components/Recipes/Recipes';
import RecipeDetails from './components/RecipeDetail/RecipeDetail';
import AddRecipe from './components/AddRecipe/AddRecipe';
import Cuisines from './components/Cuisine/Cuisine';
import Stats from './components/Stats/Stats'





const router = createBrowserRouter([

  {
    path:"/",
    element:<Navbar/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/recipes",
        element:<Recipes/>
      },
      {
        path:"/about",
        element:<AboutUs/>
      },
      {
        path:"/ingredients",
        element:<Ingedients/>
      },
      {
        path:"/recipes/:id",
        element:<RecipeDetails/>
      },
      {
        path:"/recipes/create",
        element:<AddRecipe/>
      },
      {
        path:"/cuisines",
        element:<Cuisines/>
      },
      {
        path:"/statistics",
        element:<Stats/>
      },

    ]
  }
])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
