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

const Rencontre = React.createClass({
  render() {
    // console.debug(`Ouverture rencontre: ` + Immutable.fromJS(this.props.rencontre.histoMarques))
    this.state = this.props.rencontre
    const style = {
      color: "white"
    }
    let labelBouton = this.props.modeEdition ? "Sauver" : "Edition"
    let date = this.props.rencontre.date ? new Date(this.props.rencontre.date) : new Date()
    // console.debug(`test: ${date}`)
    return this.props.modeEdition ? (
      <RencontreEdition
        rencontre = {this.props.rencontre}
        sauver={this.props.sauver}
        modeVerrouille = {this.props.modeVerrouille}
        surVerrouillage={this.props.surVerrouillage}
        termine = {this.props.termine}
        surTermine={this.props.surTermine}
      />
    ) : (
      this.props.modeHistogramme ? (
      <div>
        <AppBar
          title="Histogramme rencontre"
          iconElementLeft={
            <IconButton onClick={this.props.historique}>
              <NavigationArrowBack />
            </IconButton>
          }
          />
        <Histogramme rencontre={this.props.rencontre}/>
      </div>
    ) : (
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
                    onClick={this.props.editer}
                    primaryText="Edition" 
                  />
                  <MenuItem 
                    onClick={this.props.historique}
                    primaryText="Histogramme" />
              </IconMenu>
            } />
          <Tableau
            rencontre={this.props.rencontre}
            surNouvelleMarque={this.props.surNouvelleMarque}
            surPeriode={this.props.surPeriode}
            surChangementHote={this.props.surChangementHote}
            surChangementVisiteur={this.props.surChangementVisiteur}
            modeVerrouille={this.props.modeVerrouille} />
          <Commentaires
            rencontre={this.props.rencontre}
            surNouveauCommentaire={this.props.surNouveauCommentaire}
            modeVerrouille={this.props.modeVerrouille} />
        </div>
      )
    )
  }
})

export default Rencontre
