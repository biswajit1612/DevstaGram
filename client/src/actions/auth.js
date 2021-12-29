import { AUTH } from '../constants/actionTypes';
import * as api from '../api';  //it will import everything from api


export const signin = (formData, navigate) => async(dispatch) => {
    try {
        //log in the user
        const { data } = await api.signIn(formData);  //when we post api request it then goes back to the backend(controller) where we get back a response from there we destructure response.data and then pass that data in payload while we dispatch an action
        dispatch({ type: AUTH, payload: data});

        navigate('/');
    } catch (error) {
        console.log(error);
    }
}

export const signup = (formData, navigate) => async(dispatch) => {
    try {
        //sign up the user
        const { data } = await api.signUp(formData);  //when we post api request it then goes back to the backend(controller) where we get back a response from there we destructure response.data and then pass that data in payload while we dispatch an action
        dispatch({ type: AUTH, payload: data});
        navigate('/');
    } catch (error) {
        console.log(error);
    }
}