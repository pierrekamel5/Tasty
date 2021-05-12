import React, {useState, useEffect} from 'react';
import axios from 'axios'
import RecipesList from '../Components/RecipesList';
import { useParams } from "react-router-dom";
import LoadingSpinner from '../Components/Shared/LoadingSpinner';

const Recipes = () => {
  const [loadedRecipes, setLoadedRecipes] = useState();
  var myarray = [];
  const recipeId = useParams().recipeId;
  useEffect(()=>{
    const getRecipes = async() => {
     const options = {
       method: 'GET',
       url: 'https://edamam-recipe-search.p.rapidapi.com/search',
       params: {q: recipeId},
       headers: {
         'x-rapidapi-key': 'd01285340bmsh09113694a7b7c9bp185c4bjsnabc4fcc3dae6',
         'x-rapidapi-host': 'edamam-recipe-search.p.rapidapi.com'
       }
     };
     
   await  axios.request(options).then(res =>{
       res.data.hits.map(x => {
        myarray.push(x.recipe)
       })
       setLoadedRecipes(myarray)
     }).catch(function () {
     });
    }
    getRecipes();
   }, [])
  return (
    <div className="row">
    {!loadedRecipes && <LoadingSpinner/>}
   
    {loadedRecipes && <RecipesList items={loadedRecipes} title="Meat Recipes"/>}
  </div>
  );
};

export default Recipes;
