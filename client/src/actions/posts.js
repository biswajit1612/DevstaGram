import { FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, START_LOADING, END_LOADING, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';
import * as api from '../api';  //it will import everything from api


//action creator
export const getPost = (id) => async(dispatch) => {
    try {
        //before fetching all posts we should start loading so that the user knows we are fetching posts
        dispatch({ type : START_LOADING });
        //when we fetch we get a response object which contains data we have destructured it
        const { data } = await api.fetchPost(id);  //we are fetching the posts 
        // console.log(data);
        dispatch({ type: FETCH_POST, payload: data });  //this will now trigger our reducer
        
    } catch (error) {
        console.log(error.response.data.message);
    }
}
//due to redux thunk we can make a function which returns another function which has dispatch passed as a parameter 
export const getPosts = (page) => async(dispatch) => {
    try {
        //before fetching all posts we should start loading so that the user knows we are fetching posts
        dispatch({ type : START_LOADING });
        //when we fetch we get a response object which contains data we have destructured it
        const { data } = await api.fetchPosts(page);  //we are fetching the posts 
        // console.log(data);
        dispatch({ type: FETCH_ALL, payload: data });  //this will now trigger our reducer
        //after fetching all our posts now we will end loading
        dispatch({ type : END_LOADING });
    } catch (error) {
        console.log(error.response.data.message);
    }
}

export const getPostsBySearch = (searchQuery) => async(dispatch) => {
    try {
        dispatch({ type : START_LOADING });
        //response.data.data
        const { data : { data } } = await api.fetchPostsBySearch(searchQuery);
        dispatch({ type: FETCH_BY_SEARCH, payload: data });
        //console.log(data);
        dispatch({ type : END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const createPost = (post, navigate) => async(dispatch) => {
    try {
        dispatch({ type : START_LOADING });
        const { data } = await api.createPost(post);  //axios is promised based http function in async await after fetching/posting it returns a response in which response.data contains our data
        dispatch({type: CREATE, payload: data});
        navigate(`/posts/${data._id}`);
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