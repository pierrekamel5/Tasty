import {
    GET_MARKETS_STARTED,
    GET_MARKETS_SUCCESS,
    GET_MARKETS_ERROR,

    GET_MARKET_STARTED,
    GET_MARKET_SUCCESS,
    GET_MARKET_ERROR,

    GET_PRODUCTS_STARTED,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_ERROR,

    GET_NUMBER_OF_TABLES_STARTED,
GET_NUMBER_OF_TABLES_SUCCESS,
GET_NUMBER_OF_TABLES_ERROR
  } from "../actions/markets";
  
  const defaultState = {
    restaurants: [],
    isLoading: false,
  };
  
  
  function marketsReducer(state = defaultState, action) {
    switch (action.type) {
      case GET_MARKETS_STARTED:
        return { loading: true };
      case GET_MARKETS_SUCCESS:
        return { loading: false, RestaurantsAvailable: action };
      case GET_MARKETS_ERROR:
        return { loading: false,error: action.payload };
      default: return state;
    }
   
  }
  
  function marketReducer(state = defaultState, action) {
    switch (action.type) {
      case GET_MARKET_STARTED:
        return { loading: true };
      case GET_MARKET_SUCCESS:
        return { loading: false, RestaurantsAvailable: action };
      case GET_MARKET_ERROR:
        return { loading: false, error: action.payload };
      default: return state;
    }
  }

  function productsReducer(state = defaultState, action) {
    switch (action.type) {
      case GET_PRODUCTS_STARTED:
        return { loading: true };
      case GET_PRODUCTS_SUCCESS:
        return { loading: false, MyProducts: action };
      case GET_PRODUCTS_ERROR:
        return { loading: false,error: action.payload };
      default: return state;
    }
   
  }
  function numberOfTablesReducer(state = defaultState, action) {
    switch (action.type) {
      case GET_NUMBER_OF_TABLES_STARTED:
        return { loading: true };
      case GET_NUMBER_OF_TABLES_SUCCESS:
        return { loading: false, NumberOfTables: action };
      case GET_NUMBER_OF_TABLES_ERROR:
        return { loading: false,error: action.payload };
      default: return state;
    }
   
  }
  export  {marketsReducer, marketReducer, productsReducer,numberOfTablesReducer };
  