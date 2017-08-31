import React from 'react';
import { Component } from 'react';
import { Route } from 'react-router-dom';
import { MainPage } from './MainPage.jsx'
import { EcgPage }  from './EcgPage.jsx'
import { EmptyPage } from './Common.jsx'

export class App extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={MainPage} />
                <Route path="/ecg" component={EcgPage} />
                <Route path="/ct" component={EmptyPage} />               
            </div>
        );
    }
}
