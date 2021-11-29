import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';
import * as api from '../api';  //it will import everything from api


//action creator

//due to redux thunk we can make a function which returns another function which has dispatch passed as a parameter 
export const getPosts = () => async(dispatch) => {
    try {
        //when we fetch we get a response object which contains data we have destructured it
        const { data } = await api.fetchPosts();  //we are fetching te post 
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