import { combineReducers } from "redux"
import authReducer  from './auth/auth.reducer'

const reducer = combineReducers({
    Auth: authReducer
  })
  
  export default reducer