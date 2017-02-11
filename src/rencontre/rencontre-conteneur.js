import React from "react"
import Rx from 'rxjs'
import Immutable from "immutable"
import io from "socket.io-client"
import Rencontre from "./rencontre"
import * as types from "./rencontre-actions"
import typesCommande from "../types-commande"
import Repartiteur from "./rencontre-repartiteur"
let {etat$, action$} = Repartiteur()

export default class RencontreConteneur extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io(location.href)
    this.state = {
      modeEdition: false,
      modeVerrouille: true
    }
  }
  componentDidMount() {
    etat$.subscribe(etat => this.setState(etat))
    console.info("rencontre componentDidMount")
    const idRencontre = this.props.params.idRencontre
    this
      .socket
      .on("connect", () => {
        console.info(`Connecté avec la table de marque: ${this.socket.id}`)
        this
          .socket
          .emit("commande", {
            type: typesCommande.LIRE_RENCONTRE,
            idRencontre: idRencontre,
            idSocket: this.socket.id
          })
        this
          .socket
          .on("evenement", evenement => {
            // console.debug("Reception d'un évenement: " + JSON.stringify(evenement))
            action$.next(evenement)
          })
      })
  }
  componentWillUnmount() {
    console.info("rencontre componentWillUnmount")
    this
      .socket
      .disconnect()
  }
  surNouvelleMarque() {
    // console.info("Panier marque: " + JSON.stringify(this.state.rencontre))
    this
      .socket
      .emit("commande", {
        type: typesCommande.PANIER_MARQUE,
        idRencontre: this.state.rencontre.id,
        marqueHote: this.state.rencontre.hote.marque,
        marqueVisiteur: this.state.rencontre.visiteur.marque
      })
  }
  surNouveauCommentaire(commentaire) {
    // console.debug(`surNouveauCommentaire: ${commentaire}`)
    this
      .socket
      .emit("commande", {
        type: typesCommande.ENREGISTRER_COMMENTAIRE,
        idRencontre: this.state.rencontre.id,
        "commentaire": commentaire
      })
  }
  surChangementHote(sor, ent) {
    // console.debug(`Changement hote ${sor} par ${ent}`)
    let joueuses = Immutable
      .List(this.state.rencontre.hote.joueuses)
      .map(joueuse => {
        if (joueuse == sor) 
          return ent
        else 
          return joueuse
      })
    this
      .socket
      .emit("commande", {
        type: typesCommande.CHANGER_JOUEUR_HOTE,
        idRencontre: this.state.rencontre.id,
        joueuses: joueuses
      })
  }
  surChangementVisiteur(sor, ent) {
    // console.debug(`Changement visiteur ${sor} par ${ent}`)
    let joueuses = Immutable
      .List(this.state.rencontre.hote.joueuses)
      .map(joueuse => {
        if (joueuse == sor) 
          return ent
        else 
          return joueuse
      })
    this
      .socket
      .emit("commande", {
        type: typesCommande.CHANGER_JOUEUR_VISITEUR,
        idRencontre: this.state.rencontre.id,
        joueuses: joueuses
      })
  }
  surPeriode(periode) {
    // console.debug("Nouvelle periode: " + JSON.stringify(periode))
    this
      .socket
      .emit("commande", {
        type: typesCommande.CHANGER_PERIODE,
        idRencontre: this.state.rencontre.id,
        periode: periode
      })
  }
  sauver(majRencontre) {
    this
      .socket
      .emit("commande", {
        type: typesCommande.MAJ_RENCONTRE,
        idRencontre: majRencontre.id,
        idSocket: this.socket.id,
        rencontre: majRencontre
      })
  }
  editer() {
    action$.next({type: types.EDITER_RENCONTRE})
  }
  surVerrouillage() {
    action$.next({type: types.VERROUILLAGE})
  }
  render() {
    // console.debug(`Nouvelle rencontre: ` + this.state.rencontre)
    let rencontre = <Rencontre
      rencontre={this.state.rencontre}
      surNouvelleMarque={this
      .surNouvelleMarque
      .bind(this)}
      surPeriode={this
      .surPeriode
      .bind(this)}
      editer={this
      .editer
      .bind(this)}
      sauver={this
      .sauver
      .bind(this)}
      surNouveauCommentaire={this
      .surNouveauCommentaire
      .bind(this)}
      surChangementHote={this
      .surChangementHote
      .bind(this)}
      surChangementVisiteur={this
      .surChangementVisiteur
      .bind(this)}
      modeEdition={this.state.modeEdition}
      modeVerrouille={this.state.modeVerrouille}
      surVerrouillage={this
      .surVerrouillage
      .bind(this)}/>
    return this.state.rencontre
      ? rencontre
      : null
  }
}
