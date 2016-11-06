import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import Routeur from './router'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin();

ReactDOM.render(
  <Provider store={store}>{Routeur}</Provider>,
  document.getElementById("content")
)