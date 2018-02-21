import React from 'react'
import { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { Provider } from 'mobx-react'

import { ecg_store, ct_store, mt_store} from '../stores/stores'
import MainPage from './MainPage.jsx'
import MainMenu from './MainMenu.jsx'
import ECGPage from './ECGPage.jsx'
import ECGItemPage from './ECGItemPage.jsx'
import CTPage from './CTPage.jsx'
import CTItemPage from './CTItemPage.jsx'
import MTPage from './MTPage.jsx'


export default class App extends Component {
  render() {
    return (
    <Provider ecg_store={ecg_store} ct_store={ct_store} mt_store={mt_store}>
        <Router>
        <div>
            <MainMenu />
            <Switch>
                <Route exact path="/" component={MainPage} />
                <Route exact path="/ecg" component={ECGPage} />
                <Route path="/ecg/:id" component={ECGItemPage} />
                <Route exact path="/ct" component={CTPage} />
                <Route path="/ct/:id" component={CTItemPage} />
                <Route exact path="/mt" component={MTPage} />
            </Switch>
        </div>
        </Router>
    </Provider>
    )
  }
}
