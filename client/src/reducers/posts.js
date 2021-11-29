import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';
export default (posts = [],action) => {   //we pass state (here posts is the state) and action ...state is assigned to initial state
    switch (action.type) {
        case DELETE:
            return posts.filter((post) => post._id !== action.payload);
        case UPDATE:
        case LIKE:
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);   //map returns an array action.payload contains updated post so we are mapping over all post and if its id is equal to actio.payload id (updated) then in that place return payload(updated) or else return that post itself
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...posts, action.payload];  //when we return new state the app component re renders
        default:
            return posts;
    }
}