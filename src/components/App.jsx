import React from 'react'
import { Provider } from 'mobx-react'

import { ecgStore } from '../stores/stores'
import EcgPage from './EcgPage.jsx'

export default class App extends React.Component {
  render () {
    return (
      <Provider ecgStore={ecgStore}>
        <div>
          <EcgPage />
        </div>
      </Provider>
    )
  }
}
