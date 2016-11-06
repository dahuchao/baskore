import React from 'react'
import ReactDOM from 'react-dom'
import Accueil from "./composants/accueil-conteneur"
// import "../sass/theme.scss"

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
    <Accueil/>, document.getElementById("content"))