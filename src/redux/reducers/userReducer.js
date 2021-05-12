import {
    GET_USERS_STARTED,
    GET_USERS_SUCCESS,
    GET_USERS_ERROR,
  
    LOGIN_USER_STARTED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,

    REGISTER_USER_STARTED,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,

    MAKE_RESERVATION_STARTED,
    MAKE_RESERVATION_SUCCESS,
    MAKE_RESERVATION_ERROR,

    ADD_FEEDBACK_STARTED,
    ADD_FEEDBACK_SUCCESS,
    ADD_FEEDBACK_ERROR,

    GET_FEEDBACK_BY_USERID_STARTED,
    GET_FEEDBACK_BY_USERID_SUCCESS,
    GET_FEEDBACK_BY_USERID_ERROR,

    GET_RESERVATIONS_STARTED,
    GET_RESERVATIONS_SUCCESS,
    GET_RESERVATIONS_ERROR ,

    GET_FEEDBACKS_STARTED,
    GET_FEEDBACKS_SUCCESS,
    GET_FEEDBACKS_ERROR,

    REMOVE_FEEDBACK_STARTED,
    REMOVE_FEEDBACK_SUCCESS,
    REMOVE_FEEDBACK_ERROR,

    GET_RESERVATION_FOR_USER_STARTED,
    GET_RESERVATION_FOR_USER_SUCCESS,
    GET_RESERVATION_FOR_USER_ERROR
  } from "../actions/users";
  
  const defaultState = {
    users: [],
    isLoading: false,
  };
  
  function userReducer(state = defaultState, action) {
    switch (action.type) {
      case GET_USERS_STARTED:
        return Object.assign({}, state, {
          isLoading: true,
        });
      case GET_USERS_SUCCESS:
        return Object.assign({}, state, {
          isLoading: false,
          users: action.payload.data
        });
      case GET_USERS_ERROR:
        return Object.assign({}, state, {
          isLoading: false,
          users: action.payload.data,
        });
      default:
        return state;
    }
  }
  function userLoginReducer(state = defaultState, action) {
    switch (action.type) {
      case LOGIN_USER_STARTED:
        return { loading: true };
      case LOGIN_USER_SUCCESS:
        return { loading: false, userInfo: action,isLoggedIn: true };
      case LOGIN_USER_ERROR:
        return { loading: false,userInfo: action, isLoggedIn: false };
      default: return state;
    }
   
  }
  
  function userRegisterReducer(state = {}, action) {
    switch (action.type) {
      case REGISTER_USER_STARTED:
        return { loading: true };
      case REGISTER_USER_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case REGISTER_USER_ERROR:
        return { loading: false, error: action.payload };
      default: return state;
    }
  }
    function makeReservationReducer(state = {}, action) {
      switch (action.type) {
        case MAKE_RESERVATION_STARTED:
          return { loading: true };
        case MAKE_RESERVATION_SUCCESS:
          return { loading: false, userInfo: action.payload };
        case MAKE_RESERVATION_ERROR:
          return { loading: false, error: action.payload };
        default: return state;
      }
  }
  function addFeedbackReducer(state = {}, action) {
    switch (action.type) {
      case ADD_FEEDBACK_STARTED:
        return { loading: true };
      case ADD_FEEDBACK_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case ADD_FEEDBACK_ERROR:
        return { loading: false, error: action.payload };
      default: return state;
    }
}
function getFeedbackReducter(state = defaultState, action) {
switch (action.type) {
  case GET_FEEDBACKS_STARTED:
    return Object.assign({}, state, {
      isLoading: true,
    });
  case GET_FEEDBACKS_SUCCESS:
    return Object.assign({}, state, {
      isLoading: false,
      users: action.payload.data
    });
  case GET_FEEDBACKS_ERROR:
    return Object.assign({}, state, {
      isLoading: false,
      users: action.payload.data,
    });
  default:
    return state;
}
}
function getFeedbackByUserId(state = defaultState, action) {
  switch (action.type) {
    case GET_FEEDBACK_BY_USERID_STARTED:
      return { loading: true };
    case GET_FEEDBACK_BY_USERID_SUCCESS:
      return { loading: false, userInfo: action,isLoggedIn: true };
    case GET_FEEDBACK_BY_USERID_ERROR:
      return { loading: false,userInfo: action, isLoggedIn: false };
    default: return state;
  }
 
}
function getReservationsReducer(state = defaultState, action) {
switch (action.type) {
  case GET_RESERVATIONS_STARTED:
    return Object.assign({}, state, {
      isLoading: true,
    });
  case GET_RESERVATIONS_SUCCESS:
    return Object.assign({}, state, {
      isLoading: false,
      users: action.payload.data
    });
  case GET_RESERVATIONS_ERROR:
    return Object.assign({}, state, {
      isLoading: false,
      users: action.payload.data,
    });
  default:
    return state;
}
}
function removeFeedbackReducer(state = defaultState, action) {
  switch (action.type) {
    case REMOVE_FEEDBACK_STARTED:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case REMOVE_FEEDBACK_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        users: action.payload.data
      });
    case REMOVE_FEEDBACK_ERROR:
      return Object.assign({}, state, {
        isLoading: false,
        users: action.payload.data,
      });
    default:
      return state;
  }
  }

  function getReservationByUserIdReducer(state = defaultState, action) {
    switch (action.type) {
      case GET_RESERVATION_FOR_USER_STARTED:
        return { loading: true };
      case GET_RESERVATION_FOR_USER_SUCCESS:
        return { loading: false, userInfo: action };
      case GET_RESERVATION_FOR_USER_ERROR:
        return { loading: false,userInfo: action };
      default: return state;
    }
   
  }
  export  {userReducer, userLoginReducer, userRegisterReducer, makeReservationReducer,addFeedbackReducer
    ,getFeedbackByUserId,getReservationsReducer,getFeedbackReducter,removeFeedbackReducer,getReservationByUserIdReducer};
  