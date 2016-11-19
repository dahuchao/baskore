import React from "react"
import Immutable from "immutable"
import { connect } from "react-redux"
import store from "../store"
import * as types from "../actions/actions-types"
import request from "request"
import io from "socket.io-client"
import Rencontre from "./rencontre"

let RencontreConteneur = React.createClass({
  componentWillMount() {
    var adresse = location.href
    console.info("Adresse web socket: " + adresse)
    this.socket = io(adresse)
    this.socket.on("connect", this.connexionTableMarque)
  },
  componentWillUnmount() {
    const idRencontre = this.props.rencontre.id
    console.info("Fermeture tableau rencontre " + idRencontre)
    this.socket.emit("fermerRencontre", idRencontre)
  },
  componentDidMount() {
    const idRencontre = this.props.params.idRencontre
    this.socket.emit("ouvrirRencontre", idRencontre)
    let adresse = location.protocol + "//" + location.host + "/api/rencontres/" + idRencontre
    console.info("Requete de l'API web: " + adresse)
    request(adresse, function (error, response, rencontre) {
      if (!error && response.statusCode == 200) {
        let oRencontre = JSON.parse(rencontre)
        store.dispatch({
          type: types.GET_RENCONTRE_SUCCESS,
          rencontre: oRencontre
        })
      }
    })
  },
  connexionTableMarque() {
    console.info("Connecté avec la table de marque")
    const idRencontre = this.props.params.idRencontre
    // console.info("Identifiant rencontre: " + idRencontre)
    this.socket.emit("ouvrirRencontre", idRencontre)
    this.socket.on("nouvelleInfo", this.surReceptionNouvelleInfo)
  },
  surReceptionNouvelleInfo(rencontre) {
    // console.debug("Reception d'une nouvelle info provenant du serveur: " + JSON.stringify(rencontre))
    store.dispatch({
      type: types.NOUVELLE_INFO,
      rencontre: rencontre
    })
  },
  surNouvelleMarque(rencontre) {
    this.socket.emit('panierMarque', this.props.rencontre)
  },
  surNouveauCommentaire(commentaire) {
    console.debug(`Commentaire: ${commentaire}`)
    this.socket.emit("nouveauCommentaire", {
      "idRencontre": this.props.params.idRencontre,
      "commentaire": commentaire
    })
    store.dispatch({
      type: types.COMMENTAIRE_POST,
      commentaire: commentaire
    })
    this.socket.on("nouveauCommentaire", ()=>
    store.dispatch({
      type: types.COMMENTAIRE_NOUVEAU,
      commentaire: commentaire
    }))
  },
  surPeriode(periode) {
    // let rencontre = this.props.rencontre
    // rencontre.periode = periode
    console.debug("Nouvelle periode: " + JSON.stringify(periode))
    store.dispatch({
      type: types.NOUVELLE,
      periode: periode
    })
  },
  surChangementHote(sor,ent) {
    console.debug(`Changement hote ${sor} par ${ent}`)
    store.dispatch({
      type: types.CHANGEMENT_HOTE,
      sortant: sor,
      entrant:ent
    })
  },
  surChangementVisiteur(sor,ent) {
    console.debug(`Changement visiteur ${sor} par ${ent}`)
    store.dispatch({
      type: types.CHANGEMENT_VISITEUR,
      sortant: sor,
      entrant:ent
    })
  },
  sauver(infos) {
    let strInfo = JSON.stringify(infos)
    console.debug(`Rencontre cont(sauver): ${strInfo}`)
    let rencontre = Immutable.fromJS(this.props.rencontre)
      .set("date",infos.date)
      .set("periode",infos.periode)
      .set("hote.nom",infos.hote)
      .set("visiteur.nom",infos.visiteur)
    // rencontre.hote.nom = infos.hote
    var adresse = location.protocol + "//" + location.host + "/api/rencontres/" + this.props.rencontre.id
    console.debug(`rencontre.date: ${rencontre.date}`)
    console.info("Requete de l'API web: " + adresse)
    request({ url: adresse, method: "PUT", json: rencontre }, function (error, response, rencontre) {
      if (!error && response.statusCode == 200) {
        console.info("Rencontre modifiée :" + JSON.stringify(rencontre))
        store.dispatch({
          type: types.PUT_RENCONTRE_SUCCESS,
          rencontre: rencontre
        })
      }
    })
  },
  editer() {
    store.dispatch({
      type: types.EDITER_RENCONTRE
    })
  },
  surVerrouillage() {
    store.dispatch({
      type: types.VERROUILLAGE
    })
  },
  render() {
    // console.debug(`Nouvelle rencontre` + Immutable.fromJS(this.props.rencontre))
    return (
      !this.props.rencontre ? null :
        <Rencontre
          rencontre={this.props.rencontre}
          surNouvelleMarque={this.surNouvelleMarque}
          surPeriode={this.surPeriode}
          surChangementHote={this.surChangementHote}
          surChangementVisiteur={this.surChangementVisiteur}
          editer={this.editer}
          sauver={this.sauver}
          surNouveauCommentaire={this.surNouveauCommentaire}
          modeEdition={this.props.modeEdition}
          modeVerrouille={this.props.modeVerrouille}
          surVerrouillage={this.surVerrouillage} />
    )
  }
})
const mapStateToProps = function (store) {
  console.debug("Modification des propriétés.")
  return {
    rencontre: store.rencontreState.rencontre,
    modeEdition: store.rencontreState.modeEdition,
    modeVerrouille: store.rencontreState.modeVerrouille
  }
}

export default connect(mapStateToProps)(RencontreConteneur)
