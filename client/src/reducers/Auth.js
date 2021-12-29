import { AUTH , LOGOUT } from '../constants/actionTypes';

const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            //console.log(action?.payload);
            //...action?.payload is basically putting both result and token as parameter under profile in local storage
            localStorage.setItem('profile', JSON.stringify({...action?.payload}));   //payload consists of result and token to save both of them we are spreading(spread operator) the payload...in case of individual we dont have to spread
            return {...state, authData: action?.payload};  //we are spreading the state that means we are keeping the details of the user that are logged in
        case LOGOUT:
            localStorage.clear();
            return {...state, authData: null};
        
        default:
            return state;
    }
}

export default authReducer;