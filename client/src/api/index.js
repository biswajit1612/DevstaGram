import axios from 'axios';
const API = axios.create({ baseURL: 'https://devsta-gram-app.herokuapp.com' }); //creating an axios instance with baseurl
//this will help our auth middleware - it will add something to each and every request...this is a function that will happen on each and every request
//we are doing this because we need to send the token to the backend where we need to access it
//http://localhost:5000
//https://devsta-gram-app.herokuapp.com
API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {  //if it exists then we need to send the token
        //we need to send our token but it should start with "Bearer" and then after space it is the actual token
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    //also we need to return request so that we can make future request
    return req;
});

// const url = 'https://devstagram-app.herokuapp.com/posts'; //this how we used to earlier before we havd created an instance
// export const fetchPosts = () => axios.get(url);

//... /posts
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
export const createPost = (newPost) => API.post('/posts', newPost);  //we recieve the post as parameter that we want create and in axios.post we pass the url as well as the data we want to post
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

//.../users
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);