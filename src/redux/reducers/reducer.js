import { combineReducers } from 'redux';

import {userReducer, userLoginReducer, userRegisterReducer,makeReservationReducer,addFeedbackReducer,getFeedbackByUserId,
  getReservationsReducer,getFeedbackReducter,removeFeedbackReducer,getReservationByUserIdReducer} from './userReducer';
import  {marketsReducer, marketReducer,productsReducer,numberOfTablesReducer } from './marketReducer'
import  {addToCart, removefromCart, getCartInfo,makePayment } from './orderReducer'
const reducers = combineReducers({
  
  userReducer,
  userLoginReducer,
  userRegisterReducer,
  marketsReducer,
  marketReducer,
  addToCart,
  removefromCart,
  getCartInfo,
  makePayment
  ,productsReducer
  ,makeReservationReducer
  ,addFeedbackReducer,
  getFeedbackByUserId,
  getReservationsReducer,getFeedbackReducter,removeFeedbackReducer,getReservationByUserIdReducer,numberOfTablesReducer
});

export default reducers;
