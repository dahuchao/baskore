import React from 'react'
import ReactDOM from 'react-dom'
// import "../sass/theme.scss"

import { Provider } from 'react-redux'
import store from './store'
import Routeur from './router'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin();

class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Ca marche!</h1>
                <p>test.</p>
            </div>
        )
    }
}

ReactDOM.render(
    <App/>, document.getElementById("content"))