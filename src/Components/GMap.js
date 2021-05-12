import React, { useEffect, useRef } from 'react';
import PubSub from 'pubsub-js'
import { useDispatch, useStore } from 'react-redux';
import { marketsActions } from '../redux/actions/markets';
const GMap = () => {
  const googleMapRef = useRef(null);
  let googleMap = null;

const store = useStore();
const dispatch = useDispatch();
  useEffect(() => {
    (async()=>{
      await  dispatch(marketsActions.getRestaurants())
      setTimeout(()=>{
        googleMap = initMap();
      },1000)
     
    })();
   
   
  
  }, []);
 
  const svgMarker = {
    path:
      "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
    fillColor: "blue",
    fillOpacity: 0.9,
    strokeWeight: 0,
    rotation: 0,
    scale: 2,
  };
  function initMap() {
    const map = new window.google.maps.Map(googleMapRef.current, {
      zoom: 11,
      center: { lat: 33.82808401777517, lng: 36.03058665202773 },
      disableDefaultUI: true,
      streetViewControl: true,
    });
  
  if(localStorage.getItem("role") == 1 ){
    var markerRestaurantPositon = new window.google.maps.Marker({
      map,
      position: {lat:  33.82808401777517  , lng: 36.03058665202773},
      icon: svgMarker,
      draggable: true
     })
     markerRestaurantPositon.addListener("dragend", function(e){
      PubSub.publish('RestaurantPosition', e.latLng);
     })
    } else {
      var restaurants = store.getState().marketsReducer.RestaurantsAvailable.payload.data.data.restaurant;
    
      restaurants.forEach(element => {
        var markerr = new window.google.maps.Marker({
          map,
          position: { lat: element.latitude, lng:  element.longtitude  },
          icon: svgMarker,
          label: {
            color: "black",
            fontFamily: "Courier",
            fontSize: "21px",
            fontWeight: "bold",
            text: element.title
          }
        });
        markerr.addListener("click", function() {
          PubSub.publish('MY TOPIC', element);
        });
    });
    }
  } 

  
  async function toggleBounce() {
    PubSub.publish('MY TOPIC', true);
  }
  return <div
    ref={googleMapRef}
    style={{ width: "100%", height: 500 }}
    fullscreencontrol="false"
>
    
  </div>
}
 
export default GMap;