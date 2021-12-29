import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';
import * as api from '../api';  //it will import everything from api


//action creator

//due to redux thunk we can make a function which returns another function which has dispatch passed as a parameter 
export const getPosts = () => async(dispatch) => {
    try {
        //when we fetch we get a response object which contains data we have destructured it
        const { data } = await api.fetchPosts();  //we are fetching the posts 
        dispatch({ type: FETCH_ALL, payload: data });  //this will now trigger our reducer
    } catch (error) {
        console.log(error);
    }
}

export const createPost = (post) => async(dispatch) => {
    try {
        const { data } = await api.createPost(post);  //axios is promised based http function in async await after fetching/posting it returns a response in which response.data contains our data
        dispatch({type: CREATE, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (id, updatedPost) => async(dispatch) => {
    try {
        const { data } = await api.updatePost(id, updatedPost);

        dispatch({type: UPDATE, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async(dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({type: DELETE, payload: id});
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async(dispatch) => {
    try {
        const { data } = await api.likePost(id);

        dispatch({type: LIKE, payload: data});
    } catch (error) {
        console.log(error);
    }
}


//when we dispatch an action it returns a state and here we are combining multiple reducers so it can be accessed by key-value pair name for ex state.posts over here ...then that combined reducer is used to create a store which is responsible to manage the state and is provided to the entire app application which can be used anywhere in the application by using useSelector hook
// A store holds the whole state tree of your application. The only way to change the state inside it is to dispatch an action on it.
// dispatch - Its return value will be considered the next state.