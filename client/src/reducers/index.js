import { combineReducers } from "redux";
import posts from './posts';  //post reducer
import auth from './Auth';  // auth reducer
//to combine reducers
export default combineReducers({
    posts,
    auth
});

//every reducer has its own state so when we combine reducers the name we give in key-value pair is used to access it for ex state.posts