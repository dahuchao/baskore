import React from "react"
import action$ from "../repartiteur"
import Immutable from "immutable"
import * as types from "../actions/actions-types"
import request from "request"
import io from "socket.io-client"
import Rencontre from "./rencontre"

const init = {
  modeEdition: false,
  modeVerrouille: true
}

const etat$ = action$.scan((etat, action) => {
  console.log("##############################")
  console.log("| ACTION: " + JSON.stringify(action.type))
  let actions = {
    "DEFAUT": function () {
      return Immutable.fromJS(etat)
    }
  }
  actions[types.VERROUILLAGE] = function () {
    console.log("| verrouillage.")
    return Immutable
      .fromJS(etat)
      .set("modeVerrouille", !etat.modeVerrouille)
  }
  actions[types.GET_RENCONTRE_SUCCESS] = function () {
    console.log("| rencontre: " + JSON.stringify(action.rencontre))
    let commentaires = Immutable
      .List()
      .push({ commentaire: "Morgane entre sur le terrain à la place de Jacqueline", valide: true })
      .push({ commentaire: "Panier magnifique de Tifanie", valide: true })
      .push({ commentaire: "Les visiteurs dominent la partie", valide: true })
      .push({ commentaire: "Dans la raquette les interieurs dominent sans partage", valide: true })
      .push({ commentaire: "Superbe action des Nantaises qui malheureusement ne donnera rien", valide: true })
    let rencontreAvecCommentaire = Immutable
      .fromJS(action.rencontre)
      .set("commentaires", commentaires)
    return Immutable
      .fromJS(etat)
      .set("rencontre", rencontreAvecCommentaire)
  }
  actions[types.EDITER_RENCONTRE] = function () {
    console.log("| Mode édition: " + JSON.stringify(etat.modeEdition))
    return Immutable
      .fromJS(etat)
      .set("modeEdition", !etat.modeEdition)
  }
  actions[types.NOUVELLE_INFO] = function () {
    console.log("| rencontre: " + JSON.stringify(action.rencontre))
    return Immutable
      .fromJS(etat)
      .set("rencontre", action.rencontre)
  }
  actions[types.PUT_RENCONTRE_SUCCESS] = function () {
    console.log("| rencontre: " + JSON.stringify(action.rencontre))
    let rencontre = Immutable
      .fromJS(etat)
      .get("rencontre")
      .set("date", action.rencontre.date)
      .set("periode", action.rencontre.periode)
      .set("hote.nom", action.rencontre.hote.nom)
      .set("visiteur.nom", action.rencontre.visiteur.nom)
    return Immutable
      .fromJS(etat)
      .set("rencontre", rencontre)
      .set("modeEdition", false)
  }
  actions[types.NOUVELLE] = function () {
    console.log("| Nouvelle période: " + JSON.stringify(action.periode))
    console.log("| Nouvelle période (rencontre): " + JSON.stringify(etat.rencontre))
    let rencontre = Immutable
      .fromJS(etat)
      .get("rencontre")
      .set("periode", action.periode)
    console.log("| Nouvelle période (nouvelle rencontre): " + JSON.stringify(rencontre))
    return Immutable
      .fromJS(etat)
      .set("rencontre", rencontre)
  }
  actions[types.COMMENTAIRE_POST] = function () {
    let commentaire = action.commentaire
    console.log(` Nouveau commentaire sur la rencontre: ${commentaire}`)
    let rencontre = Immutable
      .fromJS(etat)
      .get("rencontre")
    let commentaires = rencontre
      .get("commentaires")
      .push({ commentaire: commentaire, valide: false })
    rencontre = rencontre.set("commentaires", commentaires)
    return Immutable
      .fromJS(etat)
      .set("rencontre", rencontre)
  }
  actions[types.COMMENTAIRE_NOUVEAU] = function () {
    let commentaire = action.commentaire
    console.log(` Nouveau commentaire sur la rencontre: ${commentaire}`)
    let rencontre = Immutable
      .fromJS(etat)
      .get("rencontre")
    let commentaires = rencontre
      .get("commentaires")
      .map(commentaire => {
        return commentaire.set("valide", true)
        // return commentaire
      })
    rencontre = rencontre.set("commentaires", commentaires)
    return Immutable
      .fromJS(etat)
      .set("rencontre", rencontre)
  }
  let etatNouveau = (actions[action.type] || actions['DEFAUT'])();
  console.log("Nouvel état: " + etatNouveau)
  console.log("-------------------")
  return etatNouveau.toJS()
}, init)

export default class RencontreConteneur extends React.Component {
  constructor(props) {
    super(props);
    this.state = init
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
