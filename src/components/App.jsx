import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'mobx-react'

import { ecgStore } from '../stores/stores'
import EcgPage from './EcgPage.jsx'

export default class App extends React.Component {
  render () {
    return (
      <Provider ecgStore={ecgStore}>
        <Router>
          <div>
            <Switch>
              <Route exact path='/' component={EcgPage} />
            </Switch>
          </div>
        </Router>
      </Provider>
    )
  }
}
