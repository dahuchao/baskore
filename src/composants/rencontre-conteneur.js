import React from "react"
import action$ from "../repartiteur"
import etat$ from "./rencontre-repartiteur"
import Immutable from "immutable"
import * as types from "../actions/actions-types"
import request from "request"
import io from "socket.io-client"
import Rencontre from "./rencontre"

export default class RencontreConteneur extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modeEdition: false,
      modeVerrouille: true
    }
  }
  componentWillUnmount() {
    const idRencontre = this.state.rencontre.id
    console.info("Fermeture tableau rencontre " + idRencontre)
    this
      .socket
      .emit("fermerRencontre", idRencontre)
  }
  componentDidMount() {
    etat$.subscribe(etat => this.setState(etat))
    const idRencontre = this.props.params.idRencontre
    var adresse = location.href
    console.info("Adresse web socket: " + adresse)
    this.socket = io(adresse)
    this
      .socket
      .on("connect", this.connexionTableMarque(idRencontre))
    // this   .socket   .emit("ouvrirRencontre", idRencontre)
    let rest = location.protocol + "//" + location.host + "/api/rencontres/" + idRencontre
    console.info("Requete de l'API web: " + rest)
    request(rest, function (error, response, rencontre) {
      if (!error && response.statusCode == 200) {
        let oRencontre = JSON.parse(rencontre)
        action$.next({ type: types.GET_RENCONTRE_SUCCESS, rencontre: oRencontre })
      }
    })
  }
  connexionTableMarque(idRencontre) {
    console.info("Connecté avec la table de marque")
    // const idRencontre = this.props.params.idRencontre console.info("Identifiant
    // rencontre: " + idRencontre)
    this
      .socket
      .emit("ouvrirRencontre", idRencontre)
    this
      .socket
      .on("nouvelleInfo", this.surReceptionNouvelleInfo)
  }
  surReceptionNouvelleInfo(rencontre) {
    console.debug("Reception d'une nouvelle info provenant du serveur: " +
      JSON.stringify(rencontre))
    action$.next({ type: types.NOUVELLE_INFO, rencontre: rencontre })
  }
  surNouvelleMarque(rencontre) {
    this.socket
      .emit('panierMarque', this.state.rencontre)
  }
  surNouveauCommentaire(commentaire) {
    console.debug(`Commentaire: ${commentaire}`)
    this
      .socket
      .emit("nouveauCommentaire", {
        "idRencontre": this.props.params.idRencontre,
        "commentaire": commentaire
      })
    action$.next({ type: types.COMMENTAIRE_POST, commentaire: commentaire })
    this
      .socket
      .on("nouveauCommentaire", () => action$.next({ type: types.COMMENTAIRE_NOUVEAU, commentaire: commentaire }))
  }
  surPeriode(periode) {
    // let rencontre = this.props.rencontre rencontre.periode = periode
    console.debug("Nouvelle periode: " + JSON.stringify(periode))
    action$.next({ type: types.NOUVELLE, periode: periode })
  }
  sauver(infos) {
    let strInfo = JSON.stringify(infos)
    console.debug(`Rencontre cont(sauver): ${strInfo}`)
    let rencontre = Immutable
      .fromJS(this.rencontre)
      .set("date", infos.date)
      .set("periode", infos.periode)
      .set("hote.nom", infos.hote)
      .set("visiteur.nom", infos.visiteur)
    // rencontre.hote.nom = infos.hote
    var adresse = location.protocol + "//" + location.host + "/api/rencontres/" + this.rencontre.id
    console.debug(`rencontre.date: ${rencontre.date}`)
    console.info("Requete de l'API web: " + adresse)
    request({
      url: adresse,
      method: "PUT",
      json: rencontre
    }, function (error, response, rencontre) {
      if (!error && response.statusCode == 200) {
        console.info("Rencontre modifiée :" + JSON.stringify(rencontre))
        action$.next({ type: types.PUT_RENCONTRE_SUCCESS, rencontre: rencontre })
      }
    })
  }
  editer() {
    action$.next({ type: types.EDITER_RENCONTRE })
  }
  surVerrouillage() {
    action$.next({ type: types.VERROUILLAGE })
  }
  render() {
    console.debug(`Nouvelle rencontre: ` + this.state.rencontre)
    return (!this.state.rencontre
      ? null
      : <Rencontre
        rencontre={this.state.rencontre}
        surNouvelleMarque={this.surNouvelleMarque.bind(this)}
        surPeriode={this.surPeriode}
        editer={this.editer}
        sauver={this.sauver}
        surNouveauCommentaire={this.surNouveauCommentaire}
        modeEdition={this.state.modeEdition}
        modeVerrouille={this.state.modeVerrouille}
        surVerrouillage={this.surVerrouillage} />)
  }
}
