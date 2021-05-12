import React from 'react';

import Card from './Shared/Card/Card';
import "../Styles/Restaurants.css";
import { Link } from "react-router-dom";
const RestaurantsList = props => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No restaurants found</h2>       
        </Card>
      </div>
    );
  }
  return (
  <div className="container">
      <div className="row">
      {props.items.map(restaurant => (
        <div key={restaurant.id} className="col-md-4 wow fadeInDown" style={{padding:"25px"}}>

  <div  className="card-banner card-custom">
              <Link to={`/restaurant/${restaurant.id}`}>
                <div
                  style={{
                    maxHeight:"200px"
                  }}
                  className="row"
                >
                  <div className="col-md-12">
                    <img style={{height:"200px",width:"100%"}}
                    src={`http://localhost:5000/uploads/images/${restaurant.logoImage}`}
                    ></img>
                  </div>
                </div>
              </Link>
            </div>
      </div>
      
             
      ))}
        </div>
  </div>
   
  );
};

export default RestaurantsList;
