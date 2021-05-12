import React, { useContext } from "react";
import { AuthContext } from "./auth-context";
import { NavLink } from "react-router-dom";
import { Badge } from 'primereact/badge';
import { ordersActions } from "../redux/actions/orders";
import { useDispatch, useStore } from "react-redux";
import PubSub from 'pubsub-js'
const MainNavigation = (props) => {
  const auth = useContext(AuthContext);
  const store = useStore()

  const dispatch = useDispatch()
  var [itemcount, setItemCount] = React.useState(0);
  var [role,setRole] = React.useState(2);
  React.useEffect(() => {
    setRole(localStorage.getItem("role"));
    const retrieveOrders =  () => {
      setTimeout(async ()=>{
        await  dispatch(ordersActions.getcartInfo(localStorage.getItem('user')))
      var user = ordersActions.getcartInfo(localStorage.getItem('user'));
      if(user){
        setItemCount(store.getState().getCartInfo.orders?.data?.Cart.length)
      } 
      }, 5000)
   
    
    }
    retrieveOrders();
   

  }, [])
  React.useEffect(()=>{
    PubSub.subscribe('MYCART', mySubscriber);
  }, [itemcount])
  var mySubscriber = function (msg, data) {
    if(data == "+1"){
      setItemCount(itemcount + 1);
    } else {
      setItemCount(data)
    }
   
};
  return (
      <div className="navbar  main-menu">
      <div className="container">
        <NavLink className="logo" 
            id="logo"
            style={{
              fontSize: "50px",
              color: "white",
              fontWeight: "bold",
              color: "#ff5252",
            }} to="/">
            Tasty
         </NavLink>
        {role == "2" && 
          <ul className="nav navbar-nav " >
            <li>
              <NavLink to="/restaurants" className="titlehover">RESTAURANTS</NavLink>
            </li>
            {/* <li>
              <NavLink to="/feedbacks" className="titlehover">FEEDBACK</NavLink>
            </li> */}
             <li>
              <NavLink to="/recipes" className="titlehover">RECIPES</NavLink>
            </li>
            <li>
              <NavLink to="/reservation" className="titlehover">RESERVE</NavLink>
            </li>
              <li>
                <NavLink  to="/cart" className="mycart titlehover">
                  My Cart <Badge value={itemcount} severity="danger"></Badge>
                </NavLink>
              </li>
              <li >
                <button onClick={auth.logout} className="btn btn-danger">
                  LOGOUT
                </button>
              </li>
          </ul>
         } 
             {role == "1" && 
          <ul className="nav navbar-nav " >
            <li>
              <NavLink to="/users" className="titlehover">USERS</NavLink>
            </li>
          
             <li>
              <NavLink to="/restaurant" className="titlehover">RESTAURANTS</NavLink>
            </li>
            <li>
              <NavLink to="/reservations" className="titlehover">RESERVATIONS</NavLink>
            </li>
               <li>
              <NavLink to="/feedbacks" className="titlehover">FEEDBACKS</NavLink>
            </li>
              <li >
                <button onClick={auth.logout} className="btn btn-danger">
                  LOGOUT
                </button>
              </li>
          </ul>
         } 
        </div>
    </div>
  );
};
export default MainNavigation;
