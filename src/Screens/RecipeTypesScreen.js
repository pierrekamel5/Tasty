import React from 'react';
import { Link } from 'react-router-dom'
import { recipesList } from '../configurations/Constants';
import '../Styles/recipes.css';
const RecipeTypesScreen = () => {
  
  return (
    <div>

 
    <div style={{textAlign:"center"}}>
    <h2 style={{textAlign:"center",fontSize:"35px",padding:"25px",letterSpacing:"6px"}}>Pick your type</h2>
    </div>
      <div className="container ">
        <div className="row">
        {
        recipesList.map(element => (
          <Link className="col-md-6 recipecard" key={element.id} to={`/recipes/${element.name}`}>
            <div  style={{margin:"35px"}}>
              <p className="recipetitle">{element.name}</p>
                <img className="logoStyle" src={element.img} style={{height:"300px"}} ></img>
            </div>
        </Link>
        ))
        }
        </div>
       
      </div>
    </div>
  );
};

export default RecipeTypesScreen;

