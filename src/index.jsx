import { createRoot } from 'react-dom/client';
import './index.css';
import App from './components/app/app.jsx';
import {rootReducer} from './services/reducers/index';
// import { compose,  applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import React from 'react';

const store = configureStore({reducer: rootReducer});
const root = createRoot(document.querySelector('#root'));
root.render(
<Provider store={store}>  
<App/>
</Provider>)




