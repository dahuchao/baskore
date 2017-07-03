import React from "react"
import Immutable from "immutable"
import { Link } from 'react-router'
import {
  AppBar,
  IconButton,
  IconMenu,
  ToolbarGroup,
  Toolbar,
  MenuItem
} from "material-ui"
import NavigationArrowBack from "material-ui/svg-icons/navigation/arrow-back"
import ModeEdit from "material-ui/svg-icons/editor/mode-edit"
import InsertChart from "material-ui/svg-icons/editor/insert-chart"
import LockOpen from "material-ui/svg-icons/action/lock-open"
import LockOutline from "material-ui/svg-icons/action/lock-outline"
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Tableau from "./tableau"
import Commentaires from "./commentaires"
import Histogramme from "./histogramme"
import RencontreEdition from "./rencontre-edition"

const Rencontre = props => {
  // console.debug(`Ouverture rencontre: ` + Immutable.fromJS(this.props.rencontre.histoMarques))
  const style = {color: "white"}
  return props.modeEdition ?
    <RencontreEdition
      rencontre = {props.rencontre}
      sauver={props.sauver}
      modeVerrouille = {props.modeVerrouille}
      surVerrouillage={props.surVerrouillage}
      termine = {props.termine}
      surTermine={props.surTermine}
    />
  : props.modeHistogramme
    ? <Histogramme 
        rencontre={props.rencontre} 
        historique={props.historique}
      />
    : (
      <div>
        <AppBar title="Rencontre"
          iconElementLeft={
            <Link to="/rencontres">
              <IconButton
                iconStyle={style}>
                <NavigationArrowBack />
              </IconButton>
            </Link>
          }
          iconElementRight={
            <div>
              <IconButton onClick={props.surVerrouillage} iconStyle={style}>
                {props.modeVerrouille?<LockOpen/>:<LockOutline/>}
              </IconButton>
              <IconButton onClick={props.editer} iconStyle={style}><ModeEdit/></IconButton>
              <IconButton onClick={props.historique} iconStyle={style}><InsertChart/></IconButton>
            </div>
          }
        />
        <Tableau
          rencontre={props.rencontre}
          surNouvelleMarque={props.surNouvelleMarque}
          surPeriode={props.surPeriode}
          surChangementHote={props.surChangementHote}
          surChangementVisiteur={props.surChangementVisiteur}
          modeVerrouille={props.modeVerrouille} />
        <Commentaires
          rencontre={props.rencontre}
          surNouveauCommentaire={props.surNouveauCommentaire}
          modeVerrouille={props.modeVerrouille} />
          
        <footer>
          <div id="info">
            <span className="audience">
              {props.rencontre.audience}
            </span>
            <span className="date">
            </span>
          </div>
        </footer>
      </div>
  )
}

export default Rencontre
