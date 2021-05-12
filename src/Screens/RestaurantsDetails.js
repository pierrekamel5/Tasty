import React, { useEffect,useState } from 'react';
import "../Styles/Restaurants.css";
import { Link } from "react-router-dom";
import { useDispatch,  useStore } from 'react-redux';
import { marketsActions } from '../redux/actions/markets';
const RestaurantsDetails = () => {
  const [loadedMarkets, setLoadedMarkets] = useState();

  const store = useStore()

  const dispatch = useDispatch()
  useEffect(() => {
    const retrieveMarkets = async () => {
      await  dispatch(marketsActions.getRestaurants())
      setLoadedMarkets(store.getState().marketsReducer.RestaurantsAvailable.payload.data.data.restaurant);
    }
    retrieveMarkets();
  }, [])

  return (
    <React.Fragment>
    <div style={{padding:"75px", backgroundImage:"url('https://www.xmple.com/wallpaper/blue-gradient-white-linear-1920x1080-c2-fffaf0-add8e6-a-150-f-14.svg')",
              backgroundSize:"cover"}} >
    
    {loadedMarkets && loadedMarkets.map(market => {
        return    ( <div key={market.id} className="container">
      
        <Link to={`/restaurant/${market.id}`}>
      
  
        <div className="row customCard" style={{margin:"35px",}}>
        <div className="col-md-6">
           <img className="logoStyle" src={`http://localhost:5000/uploads/images/${market.logoImage}`} style={{height:"200px",width:"300px"}} ></img>    
           </div>
           <div className="col-md-6" style={{justifyContent:"center",alignSelf:"center"}}>
            <h4>{market.KnownFor}</h4>
           </div>
          {market.restaurantImages.map((x,index) =>(
              <div key={index} className="col-md-4" style={{padding:0}}>
              <img style={{width:"100%",height:"300px"}}
              src={`http://localhost:5000/uploads/images/${x}`}
       ></img>
              </div>
        ))}
        
      </div>
        </Link>
       </div>)
    })
    }
    </div>
    
  </React.Fragment>
  );
};

export default RestaurantsDetails;

