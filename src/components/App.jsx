import React from 'react'
import { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { Provider } from 'mobx-react'

import { ecg_store, ct_store } from '../stores/stores'
import MainPage from './MainPage.jsx'
import MainMenu from './MainMenu.jsx'
import ECGPage from './ECGPage.jsx'
import CTPage from './CTPage.jsx'

export default class App extends Component {
  render() {
    return (
    <Provider ecg_store={ecg_store} ct_store={ct_store}>
        <Router>
        <div>
            <MainMenu />
            <Switch>
                <Route exact path="/" component={MainPage} />
                <Route path="/ecg" component={ECGPage} />
                <Route path="/ct" component={CTPage} />
            </Switch>
        </div>
        </Router>
    </Provider>
    )
  }
}
