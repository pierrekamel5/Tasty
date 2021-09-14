import React, { useEffect, useState} from "react";
import {  NavLink } from "react-router-dom";
import "../Styles/Orders.css";
import OrdersList from "../Components/OrdersList";
import { useDispatch, useStore } from "react-redux";
import { ordersActions } from "../redux/actions/orders";
import PubSub from 'pubsub-js'
function OrdersScreen(props) {
  const [loadedOrders, setLoadedOrders] = useState();
  var checkoutPrice = 0;
  var [CheckoutCardPrice, setPrice] = useState();

  const store = useStore()

  const dispatch = useDispatch()

  useEffect(() => {
    const retrieveOrders = async () => {
      await  dispatch(ordersActions.getcartInfo(localStorage.getItem('user')))
      setLoadedOrders(store.getState().getCartInfo.orders.data.Cart);
      store.getState().getCartInfo.orders.data.Cart.map(x => {
        checkoutPrice = checkoutPrice + x.totalprice;
        setPrice(checkoutPrice);
      })
    }
    retrieveOrders();
  }, [])

  const removeFromCartHandler =  (cart) => {
    try {
      dispatch(ordersActions.removefromCart({
        "userId": localStorage.getItem('user'),
        "productId":cart.id}))
     const newList = loadedOrders.filter(x=>
      x.id != cart.id 
 )
 PubSub.publish('MYCART', newList.length);
 setPrice(CheckoutCardPrice - cart.totalprice);
 setLoadedOrders(newList);
 
  } catch {

  }
}
   
  return (
    <React.Fragment>
         {loadedOrders && <OrdersList items={loadedOrders} />} 
         {loadedOrders && loadedOrders.length != 0 &&
      <div className="row" style={{paddingTop:"95px",paddingBottom:"95px"}}>
    
        <div className="col-md-6">
         
           <div>{loadedOrders.map(cart=> {
             return (
              <div className="row" style={{width:"100%"}} key={cart.id} >
                <div style={{backgroundColor:"white",margin:"25px", padding:"25px 80px"}}>
                      <div className="row mb-4"  style={{padding:"15px"}}>
                        <div className="col-md-5 col-lg-3 col-xl-3">
                          <div className="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                            <img  style={{height:"5rem", width:"20rem"}} src={`http://localhost:5000/uploads/images/${cart.productImg}`}/>
                          </div>
                        </div>
                        <div className="col-md-7 col-lg-9 col-xl-9">
                          <div>
                            <div className="d-flex justify-content-between">
                              <div>
                                <h5>{cart.productName}</h5>
                                <p className="mb-3 text-muted text-uppercase small"></p>
                                <p className="mb-2 text-muted text-uppercase small">Quantity: {cart.quantity}</p>
                              </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                              
                              <p className="mb-0"><span><strong>{cart.totalprice} L.L</strong></span></p>
                              <div >
                                <button className="btn btn-danger"  style={{float:"right",textAlign:"right"}} onClick={()=>removeFromCartHandler(cart)}>Remove Item</button>
                              </div>
                            </div>
                      </div>
                    </div>
            </div>
            </div>
            </div>)
           } )} </div>
        </div>     
        <div className="col-md-4">
          <div className="mb-3">
            <div
              className="pt-4"
              style={{
                boxShadow: "0 4px 17px rgba(0, 0, 0, 0.10)",
                padding: "25px",
                backgroundColor:"white"
              }}
            >
              <ul className="list-group list-group-flush">
                <li className=" d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                  <div>
                    <strong style={{ color: "black" }}>
                      Total Amount{" "}
                    </strong>
                  </div>
                  <span>
                      <strong style={{ color: "black" }}>{CheckoutCardPrice}</strong>
                  </span>
                </li>
              </ul>
                <NavLink to={`/cart/checkout`}>
                  <button type="button" className="btn btn-primary btn-block">
                    Go to checkout
                  </button>
                </NavLink>              
            </div>
          </div>
        </div>

      </div>}
    </React.Fragment>
  );
}
export default OrdersScreen;
