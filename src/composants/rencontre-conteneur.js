import React from "react"
import { connect } from "react-redux"
import store from "../store"
import * as types from "../actions/actions-types"
import request from "request"
import io from "socket.io-client"
import Rencontre from "./rencontre"

let RencontreConteneur = React.createClass({
  componentWillMount: function () {
    var adresse = location.href
    console.info("Adresse web socket: " + adresse)
    this.socket = io(adresse)
    this.socket.on("connect", this.connexionTableMarque)
  },
  componentWillUnmount: function () {
    const idRencontre = this.props.rencontre.id
    console.info("Fermeture tableau rencontre " + idRencontre)
    this.socket.emit("fermerRencontre", idRencontre)
  },
  componentDidMount: function () {
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
  connexionTableMarque: function () {
    console.info("Connecté avec la table de marque")
    const idRencontre = this.props.params.idRencontre
    // console.info("Identifiant rencontre: " + idRencontre)
    this.socket.emit("ouvrirRencontre", idRencontre)
    this.socket.on("nouvelleMarque", this.surReceptionNouvelleMarque)
  },
  surReceptionNouvelleMarque: function (rencontre) {
    // console.debug("Reception d'une nouvelle marque: " + JSON.stringify(rencontre))
    store.dispatch({
      type: types.NOUVELLE_MARQUE,
      rencontre: rencontre
    })
  },
  surNouvelleMarque: function (rencontre) {
    this.socket.emit('panierMarque', this.props.rencontre)
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
  sauver: function (infos) {
    let strInfo = JSON.stringify(infos)
    console.debug(`Rencontre cont(sauver): ${strInfo}`)
    let rencontre = this.props.rencontre
    rencontre.date = infos.date
    console.debug(`rencontre.date: ${rencontre.date}`)
    rencontre.periode = infos.periode
    rencontre.hote.nom = infos.hote
    rencontre.visiteur.nom = infos.visiteur
    var adresse = location.protocol + "//" + location.host + "/api/rencontres/" + this.props.rencontre.id
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
  editer: function () {
    store.dispatch({
      type: types.EDITER_RENCONTRE
    })
  },
  render: function () {
    // console.debug("Raffraichissement.")
    return (
      !this.props.rencontre ? null :
        <Rencontre
          rencontre={this.props.rencontre}
          surNouvelleMarque={this.surNouvelleMarque}
          surPeriode={this.surPeriode}
          editer={this.editer}
          sauver={this.sauver}
          modeEdition={this.props.modeEdition} />
    )
  }
})
const mapStateToProps = function (store) {
  // console.debug("Modification des proprités.")
  return {
    rencontre: store.rencontreState.rencontre,
    modeEdition: store.rencontreState.modeEdition
  }
}

export default connect(mapStateToProps)(RencontreConteneur)
