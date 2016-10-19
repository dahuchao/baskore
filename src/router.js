import React from "react"
import { Router, IndexRedirect, Route, useRouterHistory } from "react-router"
import { createHashHistory } from "history"
import AccueilConteneur from "./composants/accueil-conteneur.js"
import RencontresConteneur from "./composants/rencontres-conteneur.js"
import RencontreConteneur from "./composants/rencontre-conteneur.js"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

export default (
  <MuiThemeProvider>
    <Router history={appHistory}>
      <Route path="/" component={AccueilConteneur} >
        <IndexRedirect to="/rencontres" />
        <Route path="/rencontres/:idRencontre" component={RencontreConteneur} />
        <Route path="/rencontres" component={RencontresConteneur}/>
      </Route>
    </Router>
  </MuiThemeProvider>
)
