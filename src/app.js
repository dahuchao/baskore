import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import Routeur from './router'

ReactDOM.render(
  <Provider store={store}>{Routeur}</Provider>,
  document.getElementById("content")
)

// Uncomment one of the following lines to see error handling
// require('unknown-module') } syntax-error

// if (module.hot) {
//   module
//     .hot
//     .accept();
  // module
  //   .hot
  //   .dispose(function () {
  //     clearInterval(timer);
  //   });
// }
