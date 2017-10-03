import React from "react"
import Marque from "./tableau-marque.js"
import Equipe from "./tableau-equipe.js"
import {action$} from "./rencontre-actions"
import typesCommande from "../types-commande"

export default class Tableau extends React.Component {
  surPanierHote() {
    // console.info("Panier marque: " +
    // JSON.stringify(this.props.rencontre.hote.marque))
    let marque = this.props.rencontre.hote.marque + 1
    const rencontre ={
      idRencontre: this.props.rencontre.id,
      marqueHote: marque,
      marqueVisiteur: this.props.rencontre.visiteur.marque
    }
    action$.next({type: typesCommande.PANIER_MARQUE, rencontre})
  }
  surPanierVisiteur() {
    // console.info("Panier marque: " +
    // JSON.stringify(this.props.rencontre.visiteur.marque))
    let marque = this.props.rencontre.visiteur.marque + 1
    // this.props.rencontre.visiteur.marque = marque + 1
    const rencontre ={
      idRencontre: this.props.rencontre.id,
      marqueHote: this.props.rencontre.hote.marque,
      marqueVisiteur: marque
    }
    action$.next({type: typesCommande.PANIER_MARQUE, rencontre})
  }
  surCorrectionHote() {
    // console.info("Correction de la marque");
    let marque = this.props.rencontre.hote.marque - 1
    // this.props.rencontre.hote.marque = marque - 1
    const rencontre ={
      idRencontre: this.props.rencontre.id,
      marqueHote: marque,
      marqueVisiteur: this.props.rencontre.visiteur.marque
    }
    action$.next({type: typesCommande.PANIER_MARQUE, rencontre})
  }
  surCorrectionVisiteur() {
    // console.info("Correction de la marque")
    let marque = this.props.rencontre.visiteur.marque - 1
    // this.props.rencontre.visiteur.marque = marque - 1
    const rencontre ={
      idRencontre: this.props.rencontre.id,
      marqueHote: this.props.rencontre.hote.marque,
      marqueVisiteur: marque
    }
    action$.next({type: typesCommande.PANIER_MARQUE, rencontre})
  }
  render() {
    // this.ouvertureRencontre(this.props.rencontre.id)
    return this.props.rencontre
      ? <div id="tableau">
          <Equipe
            nom={this.props.rencontre.hote.nom}
            modeVerrouille={this.props.modeVerrouille}
            joueuses={this.props.rencontre.hote.joueuses}
            surChangement={this.props.surChangementHote}
            surPanier={() => this.surPanierHote()}
            />
          <Marque
            rencontre={this.props.rencontre}
            modeVerrouille={this.props.modeVerrouille}
            surPeriode={this.props.surPeriode}
            surCorrectionHote={() => this.surCorrectionHote()}
            surCorrectionVisiteur={() => this.surCorrectionVisiteur()}
            />
          <Equipe
            nom={this.props.rencontre.visiteur.nom}
            modeVerrouille={this.props.modeVerrouille}
            joueuses={this.props.rencontre.visiteur.joueuses}
            surChangement={this.props.surChangementVisiteur}
            surPanier={() => this.surPanierVisiteur()}
            />
        </div>
      : null
  }
}
