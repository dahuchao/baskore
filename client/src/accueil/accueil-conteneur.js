import React from "react"
import {Route} from 'react-router-dom'
import RencontresConteneur from "../rencontres/rencontres-conteneur.js"
import RencontreConteneur from "../rencontre/rencontre-conteneur.js"
import './theme.css';

const AccueilConteneur = ({match}) => {
  let date = new Date()
  let strDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
  let strHeure = date.getHours() + ":" + date.getMinutes()
  return (
    <div>
      <Route exact path={match.url + "rencontres"} component={RencontresConteneur}/>
      <Route 
        path={match.url + "rencontres/:idRencontre"}
        component={RencontreConteneur}/>
      <footer>
        <div id="info">
          <span className="date">
            {strDate}
            {strHeure}
          </span>
        </div>
      </footer>
    </div>
  )
}

export default AccueilConteneur