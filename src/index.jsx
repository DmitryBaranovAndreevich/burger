import { createRoot } from 'react-dom/client';
import './index.css';
import App from './components/app/app.jsx';
import {rootReducer} from './services/reducers/index';
// import { compose,  applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { socketMiddleware } from './services/middleware/socetMiddleware';
import { wsActions } from './services/actions/wsActions';
import { GET_ORDERS_LIST } from './utils/config';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware(GET_ORDERS_LIST,wsActions))
});
const root = createRoot(document.querySelector('#root'));
root.render(
<Provider store={store}>  
<App/>
</Provider>)




