import React, {useEffect, useState} from 'react';
import Recipe from './Recipe'
import logo from './logo.svg';
import './App.css';
  const App = () => {
    const APP_ID = "e25e1ace"
    const APP_KEY = "9f19f1f0f266699bf9a7cbcd00b17ce3"
    // const expRequest = `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`
    // const [counter, setCounter] = useState(0)
    const [recipes, setRecipes] = useState([])
    const [search, setSearch] = useState('')
    const [query, setQuery] = useState('mutton')
   // It rends only once if empty array given
    useEffect(() => {
      getRecipes()
   },[query])


   const getRecipes = async () => {
       const response = await fetch (`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`)
       const data = await response.json()
       console.log('***', data.hits)
       setRecipes(data.hits)
   }
   const updateSearch = e => {
    setSearch(e.target.value)
   }
   const getSearch = e => {
      e.preventDefault();
      setQuery(search)
      setSearch('')
   }

    return (
       <div className="App">
       <form onSubmit = {getSearch} className="search-form">
         <input className="search-bar" type="text" value = {search} onChange = {updateSearch}/>
         <button className="search-button" type="submit"> Search </button>
       </form>
       <div className="recipes">
       {recipes.map(recipe=>(<Recipe 
       key = {recipe.recipe.label} 
       title = {recipe.recipe.label} 
       calories = {recipe.recipe.calories}
       image = {recipe.recipe.image}
       ingredients = {recipe.recipe.ingredients}
       />
       ))}
       </div>
       </div>
    )
  } 

export default App;
