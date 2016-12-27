import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin();
import { Router, IndexRedirect, Route, useRouterHistory } from "react-router"
import { createHashHistory } from "history"
import AccueilConteneur from "./composants/accueil-conteneur.js"
import RencontresConteneur from "./composants/rencontres-conteneur.js"
import RencontreConteneur from "./composants/rencontre-conteneur.js"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

ReactDOM.render(( 
  <MuiThemeProvider>
    <Router history={appHistory}>
      <Route path="/" component={AccueilConteneur} >
        <IndexRedirect to="/rencontres" />
        <Route path="/rencontres" component={RencontresConteneur} />
        <Route path="/rencontres/:idRencontre" component={RencontreConteneur} />
      </Route>
    </Router>
  </MuiThemeProvider>
),
  document.getElementById("content")
)