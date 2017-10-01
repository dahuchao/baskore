import React from "react"
import {Route} from 'react-router-dom'
import RencontresConteneur from "../rencontres/rencontres-conteneur.js"
import RencontreConteneur from "../rencontre/rencontre-conteneur.js"
import './theme.css';

const AccueilConteneur = ({match}) => {
  return (
    <div>
      <Route exact path={match.url + "rencontres"} component={RencontresConteneur}/>
      <Route
        path={match.url + "rencontres/:idRencontre"}
        component={RencontreConteneur}/>
    </div>
  )
}

export default AccueilConteneur