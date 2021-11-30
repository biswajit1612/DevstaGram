import React from 'react';
import ReactDom from 'react-dom';

import { Provider } from 'react-redux';  //provider keeps track of the store which is the global state with the help of it we can access the state from anywhere in the app
import { createStore, applyMiddleware, compose } from 'redux';  //Improved readability and convenience are the main advantages of using compose.
import thunk from 'redux-thunk';
import App from './App';
import reducers from './reducers'; //it will automatically go to the index.js file because we have only mentioned the folder
import './index.css';
const store = createStore(reducers, compose(applyMiddleware(thunk)))

ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);   //everything will be rendered under root id
