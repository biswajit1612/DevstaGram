import { FETCH_ALL, FETCH_POST, CREATE, UPDATE, DELETE, LIKE, FETCH_BY_SEARCH, START_LOADING, END_LOADING } from '../constants/actionTypes';
//we pass state (here posts is the state) and action ...state is assigned to initial state
export default (state = { isLoading: true, posts:[] }, action) => {   
    switch (action.type) {
        case START_LOADING:
            return {...state, isLoading: true};
        case END_LOADING:
            return {...state, isLoading: false};
        case FETCH_ALL:
            return {
                ...state,
                posts : action.payload.data,
                currentPage : action.payload.currentPage,
                numberOfPages : action.payload.numberOfPages
            };
        case FETCH_BY_SEARCH:
            return {...state, posts: action.payload};
        case FETCH_POST:
            return {...state, post: action.payload};
        case CREATE:
            return {...state, posts: [...state.posts, action.payload]};  //when we return new state the app component re renders
        case DELETE:
            return {...state, posts: state.posts.filter((post) => post._id !== action.payload)};  //action.payload is the id that we want to delete
        case UPDATE:
        case LIKE:
            return {...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post)};   //map returns an array action.payload contains updated post so we are mapping over all post and if its id is equal to action.payload id (updated) then in that place return payload(updated) or else return that post itself
        default:
            return state;
    }
}