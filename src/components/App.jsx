import React from 'react';
import { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Provider } from 'mobx-react'

import { ecg_store, ct_store } from '../stores/stores'
import { MainPage } from './MainPage.jsx'
import { EcgPage }  from './EcgPage.jsx'
import { EmptyPage } from './Common.jsx'

export class App extends Component {
    render() {
        return (
            <Provider ecg_store={ecg_store} ct_store={ct_store}>
                <Router>
                    <div>
                        <Route exact path="/" component={MainPage} />
                        <Route path="/ecg" component={EcgPage} />
                        <Route path="/ct" component={EmptyPage} />               
                    </div>
                </Router>
            </Provider>
        );
    }
}
