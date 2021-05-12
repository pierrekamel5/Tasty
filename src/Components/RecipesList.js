import React from 'react';

import Card from './Shared/Card/Card';
import RecipesItem from './RecipesItem';
import '../Styles/recipes.css'
import { useHistory } from 'react-router';
const RecipesList = props => {
  const history = useHistory();
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No Recipes found</h2>       
        </Card>
      </div>
    );
  }
  return (
      <div>
         <i style={{textAlign:"center",fontSize:"25px",padding:"15px",letterSpacing:"6px",marginLeft:"15px"}}
          className="pi pi-arrow-left p-mr-2 backicon" onClick={() => history.goBack()}></i>
            <h2 style={{textAlign:"center",fontSize:"45px",padding:"25px",letterSpacing:"6px"}}>{props.title}</h2>
 <div className="row" >
      {props.items.map(recipe => (
        <RecipesItem
            key={Math.random()}
            id={Math.random()}
          title={recipe.label}
          imgUrl={recipe.image}
          totalTime={recipe.totalTime}
          ingredients={recipe.ingredients}
          source={recipe.source}
          calories={recipe.calories}
        />
      ))}
    </div>
      </div>
   
  );
};

export default RecipesList;
