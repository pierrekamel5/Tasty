import React, { useEffect, useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import '../Styles/LeftSidebar.css';
import PubSub from 'pubsub-js'
import RestaurantsAvailable from '../Screens/RestaurantsAvailable';
import { getRestaurant } from '../actions/actions';
import { Link } from 'react-router-dom';
const LeftSidebar = () => {
     const [visibleLeft, setVisibleLeft] = useState(false);
    const [data, setData] = useState();
var mySubscriber = function (msg, data) {
    setVisibleLeft(true);
    setData(data);
};
     useEffect(() => {
 PubSub.subscribe('MY TOPIC', mySubscriber);

       }, []);


    return (
        <div >
             <Sidebar style={{height:"1000px"}} position="left" visible={visibleLeft} baseZIndex={10000000000} onHide={() => setVisibleLeft(false)}>
        
             {data && 
                <div>
     <div style={{margin:0,padding:0}}>
                     
                     <img style={{width:"100%",height:"450px"}}
                        src={`http://localhost:5000/uploads/images/${data.profileImage}`}
                                     ></img>
                                     </div>
                                     <div className="row">
                                     <div className="col-md-5">
                                     <h3>{data.title}</h3>
                                     </div>
                                     <div v="row col-md-7" style={{alignSelf:"end",justifyContent:"center"}}>
                                     <Link to={`/restaurant/${data.id}`}>
                                     <button className="btn btn-primary">
                                       Order</button>
                                     </Link>
                                     <Link to={`/reservation`}>
                                     <button style={{marginLeft:"15px"}} className="btn btn-primary">
                                       Reserve</button>
                                     </Link>
                                     </div>
                                     </div>
                                    
                                     <div>
                                     <p className="labStyle"><i className="fa fa-map-marker iconDesg" ></i> {data.location}</p>
                                     </div>
                                     <div>
                                     <p className="labStyle"><i className="fa fa-star iconDesg" ></i> {data.KnownFor}</p>
                                         </div>
                                         <div>
                                         <p className="labStyle"><i className="fa fa-clock-o iconDesg" ></i> {data.openTime}</p>
                                         </div>
                                         <div>
                                         <p className="labStyle"><i className="fa fa-phone iconDesg" ></i> {data.TelNumber}</p>
                                         </div>
                                         <div>
                                          <p className="labStyle"><i className="fa fa-map-marker iconDesg" ></i> {data.location}</p>
                                         </div>
                </div>
           
                
               
            }

           
                   </Sidebar> 
            </div>
    )
}
export default LeftSidebar;