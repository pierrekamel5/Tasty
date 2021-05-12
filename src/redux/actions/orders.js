
import { addToCart, getCartInfo, getRestaurants, makePayment, removeFromCart } from "../../actions/actions";
export const ADD_TO_CART_STARTED = 'ADD_TO_CART_STARTED'
export const ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS'
export const ADD_TO_CART_ERROR = 'ADD_TO_CART_ERROR'

export const GET_CART_STARTED = 'GET_CART_STARTED'
export const GET_CART_SUCCESS = 'GET_CART_SUCCESS'
export const GET_CART_ERROR = 'GET_CART_ERROR'

export const REMOVE_FROM_CART_STARTED = 'REMOVE_FROM_CART_STARTED'
export const REMOVE_FROM_CART_SUCCESS = 'REMOVE_FROM_CART_SUCCESS'
export const REMOVE_FROM_CART_ERROR = 'REMOVE_FROM_CART_ERROR'

export const MAKE_PAYMENT_STARTED = 'MAKE_PAYMENT_STARTED'
export const MAKE_PAYMENT_SUCCESS = 'MAKE_PAYMENT_SUCCESS'
export const MAKE_PAYMENT_ERROR = 'MAKE_PAYMENT_ERROR'
const ordersActions = {
    addtoCart: (userId,productId,productName,productDiscountedPrice,productImg) => async (dispatch) => {
        try {
          dispatch({
            type: ADD_TO_CART_STARTED,
          });
          let response = await addToCart(userId,productId,productName,productDiscountedPrice,productImg)
          dispatch({
            type: ADD_TO_CART_SUCCESS,
            payload: {
                data: response,
              },
          });
        } catch (error) {
          dispatch({
            type: ADD_TO_CART_ERROR,
          });
        }
    },

getcartInfo: (userId) => async (dispatch) => {
    try {
      dispatch({
        type: GET_CART_STARTED,
      });
      let response = await getCartInfo(userId)
      dispatch({
        type: GET_CART_SUCCESS,
        payload: {
            data: response,
          },
      });
    } catch (error) {
      dispatch({
        type: GET_CART_ERROR,
      });
    }
},

removefromCart: (data) => async (dispatch) => {
    try {
      dispatch({
        type: REMOVE_FROM_CART_STARTED,
      });
      let response = await removeFromCart(data)
      dispatch({
        type: REMOVE_FROM_CART_SUCCESS,
        payload: {
            data: response,
          },
      });
    } catch (error) {
      dispatch({
        type: REMOVE_FROM_CART_ERROR,
      });
    }
},
makePayment: (data) => async (dispatch) => {
  dispatch({
    type: MAKE_PAYMENT_STARTED,
  });
    try {
      let response = await makePayment(data)
      dispatch({
        type: MAKE_PAYMENT_SUCCESS,
        payload: {
            data: response,
          },
      });
    } catch (error) {
      alert("Error")
      dispatch({
        type: MAKE_PAYMENT_ERROR,
      });
    }
}
}
export  {ordersActions};
