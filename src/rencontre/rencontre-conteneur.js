import React from "react"
import Rx from 'rxjs'
import Immutable from "immutable"
import request from "request"
import io from "socket.io-client"
import Rencontre from "./rencontre"
import * as types from "./rencontre-actions"
var typesCommande = require("../types-commande")
import Repartiteur from "./rencontre-repartiteur"
let {etat$, action$} = Repartiteur()

export default class RencontreConteneur extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modeEdition: false,
      modeVerrouille: true
    }
  }
  componentDidMount() {
    etat$.subscribe(etat => this.setState(etat))
    const idRencontre = this.props.params.idRencontre
    var adresse = location.href
    // console.info("Adresse web socket: " + adresse)
    this.socket = io(adresse)
    this
      .socket
      .on("connect", function () {
        // console.info("Connecté avec la table de marque")
        this
          .socket
          .emit("ouvrirRencontre", idRencontre)
        this
          .socket
          .on("evenement", evenement => {
            // console.debug("Reception d'un évenement: " + JSON.stringify(evenement))
            action$.next(evenement)
          })
      }.bind(this))
    let rest = location.protocol + "//" + location.host + "/api/rencontres/" + idRencontre
    // console.info("Requete de l'API web: " + rest)
    request(rest, function (error, response, rencontre) {
      if (!error && response.statusCode == 200) {
        let oRencontre = JSON.parse(rencontre)
        action$.next({type: types.GET_RENCONTRE_SUCCESS, rencontre: oRencontre})
      }
    })
  }
  componentWillUnmount() {
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
  sauver(infos) {
    console.debug(`sauver(${JSON.stringify(infos)})`)
    let rencontre = Immutable
      .fromJS(this.rencontre).toJS()
      // .set("date", infos.date)
      // .set("periode", infos.periode)
      // .setIn([
      //   "hote", "nom"
      // ], infos.hote)
      // .setIn([
      //   "visiteur", "nom"
      // ], infos.visiteur).toJS()
    // rencontre.hote.nom = infos.hote
    var adresse = location.protocol + "//" + location.host + "/api/rencontres/" + this.rencontre.id
    console.debug(`rencontre à envoyer: ${JSON.stringify(rencontre)}`)
    console.info("Requete de l'API web: " + adresse)
    request({
      url: adresse,
      method: "PUT",
      json: rencontre
    }, function (error, response, rencontre) {
      if (!error && response.statusCode == 200) {
        console.info("Rencontre modifiée :" + JSON.stringify(rencontre))
        action$.next({type: types.PUT_RENCONTRE_SUCCESS, rencontre: rencontre})
      }
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
      editer={this.editer}
      sauver={this.sauver}
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
      surVerrouillage={this.surVerrouillage}/>
    return this.state.rencontre
      ? rencontre
      : null
  }
}
