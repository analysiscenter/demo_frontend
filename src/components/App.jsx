import React from 'react'
import { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import MainPage from './MainPage.jsx'
import ECGPage from './ECGPage.jsx'
import CTPage from './CTPage.jsx'

export default class App extends Component {
  render() {
    return (
    <Router>
    <div>
        <Route exact path="/" component={MainPage} />
        <Route path="/ecg" component={ECGPage} />
        <Route path="/ct" component={CTPage} />
    </div>
    </Router>
    )
  }
}
