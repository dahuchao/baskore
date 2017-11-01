import React from "react"
import "./rencontres.css"
import { Link} from 'react-router-dom'
import {
  AppBar,
  Card,
  IconButton,
  List,
  ListItem,
  FloatingActionButton
} from "material-ui"
import ContentAdd from "material-ui/svg-icons/content/add"
import ActionDelete from "material-ui/svg-icons/action/delete"
import {types, action$} from "./rencontres-actions"
import typesCommande from "../types-commande"

export default class Rencontres extends React.Component {
  // contextTypes: {
  //   router: React.PropTypes.func.isRequired
  // },
  preparationDate(date) {
    let dateRencontre = new Date(date)
    // console.debug(`date Rencontres: ${JSON.stringify(dateRencontre)}`)
    let jour = new Date()
    let strdate = !dateRencontre ?
      "date à préciser" :
      dateRencontre < jour ?
        `${dateRencontre.toLocaleDateString()}` :
        `${dateRencontre.toLocaleDateString()} ${dateRencontre.getHours()}:${dateRencontre.getMinutes()}`
      // console.debug(`date Rencontres: ${JSON.stringify(strdate)}`)
    return strdate
  }
  zoom(idRencontre) {
    console.debug(`Ouverture de la rencontre : ${idRencontre}`)
    this.context.router.push(`/#rencontres/${idRencontre}`)
  }
  render() {
    const poubelle = {
      style: {
        width: 72,
        height: 72,
        padding: 20,
        top: 0,
        right: 0
      },
      icon: {
        width: 36,
        height: 36,
        color: "rgb(0, 188, 212)"
      }
    }
    return (
      <div>
        <AppBar title="BASKORE"
          onClick={this.props.listerRencontres}
          iconClassNameRight="muidocs-icon-navigation-expand-more">
          <div className="flottant">
            <FloatingActionButton id="bouton-plus"
              onMouseDown={()=>action$.next({type: types.CREER_RENCONTRE})}
              >
              <ContentAdd />
            </FloatingActionButton>
          </div>
        </AppBar>
        <Card>
          <List id="rencontres" >
            {this.props.rencontres.map(rencontre => {
              let strDate = this.preparationDate(rencontre.date)
              return (
                <div 
                  key={rencontre.id}
                  className="rencontre" >
                  <ListItem 
                    className="it-rencontre"
                    primaryText={rencontre.hote.nom + '-' + rencontre.visiteur.nom}
                    secondaryText={rencontre.termine ? rencontre.hote.marque + '-' + rencontre.visiteur.marque : strDate}
                    containerElement={<Link to={{ pathname:"/rencontres/" + rencontre.id}} />}
                    >
                  </ListItem>
                  <IconButton
                    style={poubelle.style}
                    iconStyle={poubelle.icon}
                    onClick={() => action$.next({type: typesCommande.SUPPRIMER_RENCONTRE, idRencontre: rencontre.id})}
                    >
                    <ActionDelete />
                  </IconButton>
                </div>
                )
            })}
          </List>
        </Card>
      </div>
    )
  }
}

