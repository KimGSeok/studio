import { AnyAction } from 'redux';
import { LOGIN_USER, LOGOUT_USER, AUTH_USER } from '../types/auth';

/* Init State */
const initialState = {
  logined: '',
  loginTime: '',
  userId: ''
};

const reducer = (state = initialState, action: AnyAction) =>{
  switch(action.type){
    case LOGIN_USER:
      return{
        ...state,
        logined: action.payload.result
      }
    case LOGOUT_USER:
      return{
        ...state,
        logined: action.payload.result
      }
    case AUTH_USER:
      return{
        ...state,
        logined: action.payload.result
      }
    default: 
      return{
        ...state
      }
  }
}

export default reducer;