
import React, { useEffect, useState } from 'react';
import { getCartInfo, } from '../actions/actions'
import Button from '../Components/Shared/Button/Button';
import { useHistory } from 'react-router-dom';
import '../Styles/Checkout.css';
import { useDispatch } from 'react-redux';
import { ordersActions } from '../redux/actions/orders';
import { getDiscountCodeByCode } from '../actions/actions';
import {useFormik} from 'formik';
import * as Yup from 'yup' 
const Checkout = () => {
    const history = useHistory();
    const [loadedOrders, setLoadedOrders] = useState();
    var checkoutPrice = 0;
    var [CheckoutCardPrice, setPrice] = useState();
    var [CheckoutCardPriceAfterDiscount, setCheckoutCardPriceAfterDiscount] = useState();
    var [discountCode, setDiscountCode] = useState(null);
    const dispatch = useDispatch();

    const formik = useFormik({
      initialValues: {
        fullname: "",
        phoneNumber: "",
        address: ""
      },
      async onSubmit(data) {
        if(CheckoutCardPriceAfterDiscount != null){
      setPrice(CheckoutCardPriceAfterDiscount)
          }
          try {
            await dispatch(ordersActions.makePayment({
              "fullname": data.fullname,
              "phoneNumber": data.phoneNumber,
              "address": data.address,
              "cardNumber":"undefined",
              "userId":localStorage.getItem("user"),
              "monthExpiration":"undefined",
              "yearExpiration":"undefined",
              "cvv":"undefined",
              "cart":  loadedOrders
      }))
      alert("Your Order Will Arrive Soon");
      history.goBack();
          } catch (error) {
            
          }
       
      }
    });
    useEffect(() => {
         const retrieveUsers = async () => {
           await getCartInfo(localStorage.getItem("user")).then(res => {
              setLoadedOrders(res.Cart);
              res.Cart.map((x) => {
                checkoutPrice = checkoutPrice + x.totalprice;
               setPrice(checkoutPrice);
              });
            });
          }
          retrieveUsers();
         }, [discountCode]) 
      
  const changeHanlder = async (e) => {
    var discountCode = e.target.value;
    let response = await getDiscountCodeByCode(discountCode);
    if(response){
      setDiscountCode(response.subscription.Pourcentage);
      setCheckoutCardPriceAfterDiscount(CheckoutCardPrice * ((100 -response.subscription.Pourcentage)/100));
    } else {
      setCheckoutCardPriceAfterDiscount(null);
      setDiscountCode(null);
    }
   
  }
  return (
    <div className="paymentPage" style={{ backgroundImage:"url('https://oliverdesign.es/wp-content/uploads/2014/12/fondo-oliverdesign.jpg')",
    backgroundSize:"cover"}}>
      <div ></div>
      <h2 className="pickyourpayment">
        Pick Your Payment And Get Your Order
        </h2>
      <div className="row">
        <div className="col-md-1"></div>
      <div className=" col-md-4 " style={{marginTop:"25px"}}>
    <form className="baseForm" onSubmit={formik.handleSubmit}>
      <div className="card card-body">
            <h4 className="card-title mb-4">Payment Cash</h4>
            <div className="form-group">
            <input type="text" placeholder="Full Name" name="fullname" id="fullname" className="email formField form-control"
              value={formik.values.fullname}  onChange={formik.handleChange}
              />
              
            </div>
            <div className="form-group">
            <input type="text" placeholder="Address" name="address" id="address" className="email formField form-control"
              value={formik.values.address}  onChange={formik.handleChange}
              />
            </div>
            
            <div className="form-group">
            <input type="number" placeholder="Phone Number" name="phoneNumber" id="phoneNumber" className="email formField form-control"
              value={formik.values.phoneNumber}  onChange={formik.handleChange}
              />
            </div>
            <div className="form-group">
              <label>Discount Code</label>
              <input
               type="text"
               className="form-control"
               element="input"
               onChange={(val)=>changeHanlder(val)}
               placeholder="Discount Code"
               
              />
            </div>
            <p className="alert alert-success">
              {" "}
              <i className="fa fa-lock"></i> The order will take 20-25 minutes to arrive , Thank for your support.
            </p>
            {discountCode === null &&
            <div className="row" style={{padding:"18px"}}>
                <div className="col-md-6" style={{fontWeight:"bold"}}>Total</div>
              <div className="col-md-6" style={{textAlign:"right",fontWeight:"bold"}}>{CheckoutCardPrice} L.L</div>
            
            </div> }
            {discountCode != null &&
            <div className="row" style={{padding:"18px"}}>
                <div className="col-md-6" style={{fontWeight:"bold"}}>Total</div>
              <div className="col-md-3" style={{textAlign:"right", textDecorationLine:"line-through"}}>{CheckoutCardPrice} L.L</div>
              <div className="col-md-3" style={{textAlign:"right",fontWeight:"bold"}}>{CheckoutCardPriceAfterDiscount} L.L</div>
            </div> }
            <Button type="submit" >
              Submit
            </Button>
          </div>
          </form>
      </div>
           
      </div>
      <div className="support">We Appreciate your support for us!</div>
    </div>
    
  );
};

export default Checkout;
