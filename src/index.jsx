import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './components/app/app.jsx';
import {data,dataBurgerConstructor} from './utils/data.jsx'; 

const root = createRoot(document.querySelector('#root'));
root.render(<App data={data} dataBurgerConstructor={dataBurgerConstructor}/>)




