import React from "react"
import Immutable from "immutable"
import { Link } from 'react-router'
import {
  AppBar,
  IconButton,
  IconMenu,
  MenuItem
} from "material-ui"
import NavigationArrowBack from "material-ui/svg-icons/navigation/arrow-back"
import ModeEdit from "material-ui/svg-icons/editor/mode-edit"
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
  : props.modeHistogramme ?
      <Histogramme 
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
            </Link>}
          iconElementRight={
            <IconMenu
              iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
              }
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem 
                onClick={props.editer}
                primaryText="Edition" 
              />
              <MenuItem 
                onClick={props.historique}
                primaryText="Histogramme" />
            </IconMenu>
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
      </div>
  )
}

export default Rencontre
