import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import {Router, IndexRedirect, Route, useRouterHistory} from "react-router"
import {createHashHistory} from "history"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import AccueilConteneur from "./accueil/accueil-conteneur.js"
import RencontresConteneur from "./rencontres/rencontres-conteneur.js"
import RencontreConteneur from "./rencontre/rencontre-conteneur.js"
injectTapEventPlugin();

// const appHistory = useRouterHistory(createHashHistory)({queryKey: false})
const appHistory = useRouterHistory(createHashHistory)()

const App = () => (
  <MuiThemeProvider>
    <Router history={appHistory}>
      <Route path="/" component={AccueilConteneur}>
        <IndexRedirect to="/rencontres"/>
        <Route path="/rencontres" component={RencontresConteneur}/>
        <Route path="/rencontres/:idRencontre" component={RencontreConteneur}/>
      </Route>
    </Router>
  </MuiThemeProvider>
)
ReactDOM.render(
  <App/>, document.getElementById("content"))