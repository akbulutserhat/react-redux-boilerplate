import * as authTypes from './auth.types';
import setAuthorizationToken from '../../../helpers/authorization';
import API_ROUTE from '../../../apiRoute';
import axios from 'axios';
import {history} from '../../../history';


export const SignIn = (credentials) => {
    return async (dispatch) => {
        dispatch({ type: authTypes.LOGIN_REQUEST }) 
      try {
        const res = await axios.post(`${API_ROUTE}/auth/login`, credentials)
        let userData = res.data.response
        localStorage.setItem("token", userData.token)
        localStorage.setItem('user_data', JSON.stringify(userData));
        setAuthorizationToken(userData.token)
        dispatch({ type: authTypes.LOGIN_SUCCESS, payload: userData })
      } catch(err) {
        dispatch({ type: authTypes.AUTH_ERROR, payload: err.response.data.error })
      }
    }
  }
  
  export const SignOut = () => {
    return (dispatch) => {
        dispatch({type: authTypes.LOGOUT_REQUEST})
        try {
        localStorage.removeItem("token")
        setAuthorizationToken(false)
        dispatch({ type: authTypes.LOGOUT_SUCCESS })
        window.localStorage.clear(); //update the localstorage
        history.push('/login');
        } catch(err) {
            dispatch({ type: authTypes.AUTH_ERROR, payload: err.response.data.error })
        }
      
    }
  }
  
  export const SignUp = (newUser) => {
      return async (dispatch) => {
          dispatch({ type: authTypes.SIGNUP_REQUEST }) 
        try {
          await axios.post(`${API_ROUTE}/auth/signup`, newUser);
          dispatch({ type: authTypes.SIGNUP_SUCCESS })
          history.push('/login');
        } catch(err) {
          dispatch({ type: authTypes.AUTH_ERROR, payload: err.response.data.error })
      }
    }
  }

