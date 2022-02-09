import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import PostDetails from './components/PostDetails/PostDetails';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';


//we want to see posts only when we are in /posts so by default at start we are in / ...so we are redirecting it to /posts....then there we want to show our home component so write a route for it again
//when we search posts then also we want to render our home component but with relatable posts .../posts/search?searchquery....then render home with selective posts
//when we click on a post we will be redirected to it details page with more info ..../posts/:id ....here id will be dynamic which will be the id of that particular post we want to see

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    return (
        <BrowserRouter>
            <Container maxWidth="xl">
                <Navbar />
                <Routes>
                    <Route path="/" exact element={<Navigate to="/posts" />} /> 
                    <Route path="/posts" exact element={<Home/>} />
                    <Route path="/posts/search" exact element={<Home/>} />
                    <Route path="/posts/:id" exact element={<PostDetails/>} />
                    <Route path="/auth" exact element={!user ? <Auth/> : <Navigate to="/posts" />} />
                </Routes>
            </Container>
        </BrowserRouter>
    );
};
export default App;