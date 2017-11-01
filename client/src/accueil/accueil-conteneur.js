import React from "react"
import {Route, Redirect} from 'react-router-dom'
import RencontresConteneur from "../rencontres/rencontres-conteneur.js"
import RencontreConteneur from "../rencontre/rencontre-conteneur.js"
import './theme.css';

const AccueilConteneur = ({match}) => {
  return (
    <div>
      <Redirect  to="/rencontres"/>
      <Route exact path={match.url + "rencontres"} component={RencontresConteneur}/>
      <Route
        path={match.url + "rencontres/:idRencontre"}
        component={RencontreConteneur}/>
    </div>
  )
}

export default AccueilConteneur