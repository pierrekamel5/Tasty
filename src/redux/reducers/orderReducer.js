import {
    ADD_TO_CART_STARTED,
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_ERROR,
  
    GET_CART_STARTED,
    GET_CART_SUCCESS,
    GET_CART_ERROR,

    REMOVE_FROM_CART_STARTED,
    REMOVE_FROM_CART_SUCCESS,
    REMOVE_FROM_CART_ERROR,

    MAKE_PAYMENT_STARTED,
    MAKE_PAYMENT_SUCCESS,
    MAKE_PAYMENT_ERROR
  } from "../actions/orders";
  
  const defaultState = {
    users: [],
    isLoading: false,
  };
  
  function addToCart(state = defaultState, action) {
    switch (action.type) {
        case ADD_TO_CART_STARTED:
          return { loading: true };
        case ADD_TO_CART_SUCCESS:
          return { loading: false, userInfo: action.payload };
        case ADD_TO_CART_ERROR:
          return { loading: false, error: action.payload };
        default: return state;
  }
}
  function removefromCart(state = defaultState, action) {
    switch (action.type) {
      case REMOVE_FROM_CART_STARTED:
        return { loading: true };
      case REMOVE_FROM_CART_SUCCESS:
        return { loading: false, userInfo: action };
      case REMOVE_FROM_CART_ERROR:
        return { loading: false,userInfo: action };
      default: return state;
    }
  }
  
  function getCartInfo(state = {}, action) {
    switch (action.type) {
      case GET_CART_STARTED:
        return Object.assign({}, state, {
          isLoading: true,
        });
      case GET_CART_SUCCESS:
        return Object.assign({}, state, {
          isLoading: false,
          orders: action.payload
        });
      case GET_CART_ERROR:
        return Object.assign({}, state, {
          isLoading: false
        });
      default:
        return state;
    }
 
    }
    function makePayment(state = defaultState, action) {
        switch (action.type) {
            case MAKE_PAYMENT_STARTED:
              return { loading: true };
            case MAKE_PAYMENT_SUCCESS:
              return { loading: false, orders : []};
             
            case MAKE_PAYMENT_ERROR:
              return { loading: false, error: action.payload };
            default: return state;
      }
    }
  
  export  {addToCart, removefromCart, getCartInfo,makePayment};
  