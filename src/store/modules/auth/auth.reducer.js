import * as authTypes from './auth.types'

export const initState = {
    isAuthenticated: false,
    currentUser: {},
    isLoading: false,
    authError: null
  }
  
  const authReducer = (state = initState, action) => {
    switch(action.type) {
        case  authTypes.SIGNUP_REQUEST:
        case authTypes.LOGOUT_REQUEST:
        case authTypes.LOGIN_REQUEST:
          return {
            ...state,
            isLoading: true,
          }
        case authTypes.SIGNUP_SUCCESS:
          return {
            ...state,
            isLoading: false,
            // Some states can be added according to backend
          }
        case authTypes.LOGIN_SUCCESS:
          return {
            ...state,
            isLoading: false,
            currentUser: action.payload,
            isAuthenticated: true,
          }
        case authTypes.LOGOUT_SUCCESS:
          return {
            ...state,
            isAuthenticated: false,
            currentUser: {},
            isLoading: false,
          }
        case authTypes.AUTH_ERROR:
          return {
            ...state,
            isLoading: false,
            authError:action.payload
          }
        
        default:
            return state;
        }
  }

  export default authReducer