import {  createUser, getUser, getUsers, login, makeFeedback, makeReservation, signUp,getFeedbackbyUserId, 
  getReservations, getFeedbacks, removeMyFeedback, getReservation } from '../../actions/actions';

export const GET_USERS_STARTED = 'GET_USERS_STARTED'
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS'
export const GET_USERS_ERROR = 'GET_USERS_ERROR'

export const GET_USER_STARTED = 'GET_USER_STARTED'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
export const GET_USER_ERROR = 'GET_USER_ERROR'

export const LOGIN_USER_STARTED = 'LOGIN_USER_STARTED'
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'
export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR'

export const REGISTER_USER_STARTED = 'REGISTER_USER_STARTED'
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS'
export const REGISTER_USER_ERROR = 'REGISTER_USER_ERROR'

export const MAKE_RESERVATION_STARTED = 'MAKE_RESERVATION_STARTED'
export const MAKE_RESERVATION_SUCCESS = 'MAKE_RESERVATION_SUCCESS'
export const MAKE_RESERVATION_ERROR = 'MAKE_RESERVATION_ERROR'

export const ADD_FEEDBACK_STARTED = 'ADD_FEEDBACK_STARTED'
export const ADD_FEEDBACK_SUCCESS = 'ADD_FEEDBACK_SUCCESS'
export const ADD_FEEDBACK_ERROR = 'ADD_FEEDBACK_ERROR'

export const GET_FEEDBACK_BY_USERID_STARTED = 'GET_FEEDBACK_BY_USERID_STARTED'
export const GET_FEEDBACK_BY_USERID_SUCCESS = 'GET_FEEDBACK_BY_USERID_SUCCESS'
export const GET_FEEDBACK_BY_USERID_ERROR = 'GET_FEEDBACK_BY_USERID_ERROR'

export const GET_RESERVATIONS_STARTED = 'GET_RESERVATIONS_STARTED'
export const GET_RESERVATIONS_SUCCESS = 'GET_RESERVATIONS_SUCCESS'
export const GET_RESERVATIONS_ERROR = 'GET_RESERVATIONS_ERROR'

export const GET_FEEDBACKS_STARTED = 'GET_FEEDBACKS_STARTED'
export const GET_FEEDBACKS_SUCCESS = 'GET_FEEDBACKS_SUCCESS'
export const GET_FEEDBACKS_ERROR = 'GET_FEEDBACKS_ERROR'

export const REMOVE_FEEDBACK_STARTED = 'REMOVE_FEEDBACK_STARTED'
export const REMOVE_FEEDBACK_SUCCESS = 'REMOVE_FEEDBACK_SUCCESS'
export const REMOVE_FEEDBACK_ERROR = 'REMOVE_FEEDBACK_ERROR'

export const GET_RESERVATION_FOR_USER_STARTED = 'GET_RESERVATION_FOR_USER_STARTED'
export const GET_RESERVATION_FOR_USER_SUCCESS = 'GET_RESERVATION_FOR_USER_SUCCESS'
export const GET_RESERVATION_FOR_USER_ERROR = 'GET_RESERVATION_FOR_USER_ERROR'
const usersActions = {

    getUsers: () => async (dispatch) => {
        try {
          dispatch({
            type: GET_USERS_STARTED,
          });
          let response = await getUsers()
          dispatch({
            type: GET_USERS_SUCCESS,
            payload: {
                data: response,
              },
          });
        } catch (error) {
          dispatch({
            type: GET_USERS_ERROR,
          });
        }
    },

    getUser: () => async (dispatch) => {
        try {
          dispatch({
            type: GET_USER_STARTED,
          });
          let response = await getUser()
          dispatch({
            type: GET_USER_SUCCESS,
            payload: {
                data: response,
              },
          });
        } catch (error) {
          dispatch({
            type: GET_USER_ERROR,
          });
        }
    },
    login_User: (data) => async (dispatch) => {
        dispatch({ type: LOGIN_USER_STARTED, payload: data });
        const  datas  = await  login(data);
        try {
         
          dispatch({ type: LOGIN_USER_SUCCESS, payload: datas });
        //  localStorage.setItem('userId',Math.random());
        //  Cookie.set('userInfo', JSON.stringify(data));
        } catch (error) {
            alert("Username or Password incorrect")
          dispatch({ type: LOGIN_USER_ERROR, payload: error.message });
        }
    },
    registerUser: (data) => async (dispatch) => {
        try {
          dispatch({
            type: REGISTER_USER_STARTED,
          });
          let response = await signUp(data)
          dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: {
                data: response,
              },
          });
        } catch (error) {
          dispatch({
            type: REGISTER_USER_ERROR,
          });
        }
    },
    makereservation: (data) => async (dispatch) => {
      dispatch({
        type: MAKE_RESERVATION_STARTED,
      });
      try {
        let response = await makeReservation(data)
        dispatch({
          type: MAKE_RESERVATION_SUCCESS,
          payload: {
              data: response,
            },
        });
        alert("Please check your email for confirmation!");
      } catch (error) {
        alert("That table is reserved, please change the number of your table")
        dispatch({
          type: MAKE_RESERVATION_ERROR,
          payload: {
            data: error,
          },
        });
      }
  },

  addFeedback: (data) => async (dispatch) => {
    dispatch({
      type: ADD_FEEDBACK_STARTED,
    });
    try {
      let response = await makeFeedback(data)
      dispatch({
        type: ADD_FEEDBACK_SUCCESS,
        payload: {
            data: response,
          },
      });
    } catch (error) {
      dispatch({
        type: ADD_FEEDBACK_ERROR,
      });
    }
},

getFeedbackByUserId: (userId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_FEEDBACK_BY_USERID_STARTED,
    });
    let response = await getFeedbackbyUserId(userId)
    dispatch({
      type: GET_FEEDBACK_BY_USERID_SUCCESS,
      payload: {
          data: response,
        },
    });
  } catch (error) {
    dispatch({
      type: GET_FEEDBACK_BY_USERID_ERROR,
    });
  }
},
getReservations: () => async (dispatch) => {
  try {
    dispatch({
      type: GET_RESERVATIONS_STARTED,
    });
    let response = await getReservations()
    dispatch({
      type: GET_RESERVATIONS_SUCCESS,
      payload: {
          data: response,
        },
    });
  } catch (error) {
    dispatch({
      type: GET_RESERVATIONS_ERROR,
    });
  }
},

getFeedbacks: () => async (dispatch) => {
  try {
    dispatch({
      type: GET_FEEDBACKS_STARTED,
    });
    let response = await getFeedbacks()
    dispatch({
      type: GET_FEEDBACKS_SUCCESS,
      payload: {
          data: response,
        },
    });
  } catch (error) {
    dispatch({
      type: GET_FEEDBACKS_ERROR,
    });
  }
},
removeFeedback: (data) => async (dispatch) => {
  try {
    dispatch({
      type: REMOVE_FEEDBACK_STARTED,
    });
    let response = await removeMyFeedback(data)
    dispatch({
      type: REMOVE_FEEDBACK_SUCCESS,
      payload: {
          data: response,
        },
    });
  } catch (error) {
    dispatch({
      type: REMOVE_FEEDBACK_ERROR,
    });
  }
},
getReservationById: (userId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_RESERVATION_FOR_USER_STARTED,
    });
    let response = await getReservation(userId)
    dispatch({
      type: GET_RESERVATION_FOR_USER_SUCCESS,
      payload: {
          data: response,
        },
    });
  } catch (error) {
    dispatch({
      type: GET_RESERVATION_FOR_USER_ERROR,
    });
  }
},
  };

export  {usersActions};



