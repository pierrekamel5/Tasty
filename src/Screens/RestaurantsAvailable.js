import React, { useEffect,useState } from 'react';
import "../Styles/Restaurants.css";
import RestaurantsList from '../Components/RestaurantsList';
import { useDispatch,  useStore } from 'react-redux';
import { marketsActions } from '../redux/actions/markets';
const RestaurantsAvailable = () => {
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
    { loadedMarkets &&
    <div>
            <div className="section-header wow fadeInDown">
            <h2 className="section-title text-center ">Our Restaurants</h2>
               
            </div>
  
     

      <RestaurantsList items={loadedMarkets} />
     
    </div>
    }
    
  </React.Fragment>
  );
};

export default RestaurantsAvailable;

