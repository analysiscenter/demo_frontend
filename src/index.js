import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { EcgStore } from './components/Stores.jsx';
import { Provider } from 'mobx-react';

import { App } from './components/App.jsx';
var mountNode = document.getElementById('root');

ReactDOM.render(  
        <BrowserRouter>
            <App />
        </BrowserRouter>,
    	mountNode)