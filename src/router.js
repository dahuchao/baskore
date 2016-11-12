import React from "react"
import { createHashHistory } from "history"
import AccueilConteneur from "./composants/accueil-conteneur.js"
import RencontresConteneur from "./composants/rencontres-conteneur.js"
import RencontreConteneur from "./composants/rencontre-conteneur.js"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"

// const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

export default (
  <MuiThemeProvider>
        <RencontresConteneur/>
  </MuiThemeProvider>
)
