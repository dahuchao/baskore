import React from "react"
import {Route} from 'react-router-dom'
import RencontresConteneur from "../rencontres/rencontres-conteneur.js"
import RencontreConteneur from "../rencontre/rencontre-conteneur.js"
import './theme.css';

function preparationDate() {
  const jour = new Date()
  return `${jour.toLocaleDateString()} ${jour.getHours()}:${jour.getMinutes()}`
}

const AccueilConteneur = ({match}) => {
  return (
    <div>
      <Route exact path={match.url + "rencontres"} component={RencontresConteneur}/>
      <Route
        path={match.url + "rencontres/:idRencontre"}
        component={RencontreConteneur}/>
      <footer>
        <div id="info">
          <span className="date">
            {preparationDate()}
          </span>
        </div>
      </footer>
    </div>
  )
}

export default AccueilConteneur