import React from "react"
import { connect } from "react-redux"
import store from "../store"
import * as types from "../actions/actions-types"
import request from "request"
import Rencontres from "./rencontres"
import RencontreAjout from "./rencontres-ajout"

const RencontresConteneur = React.createClass({
  componentDidMount: function () {
    var adresse = location.protocol + "//" + location.host + "/api/rencontres"
    console.info("Requete de l'API web: " + adresse)
    request(adresse, function (error, response, rencontres) {
      if (!error && response.statusCode == 200) {
        let oRencontres = JSON.parse(rencontres)
        store.dispatch({
          type: types.GET_RENCONTRES_SUCCESS,
          rencontres: oRencontres
        })
      }
    })
  },
  ajouterRencontre: function () {
    console.log("Ajouter rencontre.")
    store.dispatch({
      type: types.AJOUTER_RENCONTRE
    })
  },
  supprimeRencontre: function (idRencontre) {
    console.info("Suppression: " + idRencontre)
    var adresse = location.protocol + "//" + location.host + "/api/rencontres/" + idRencontre
    console.info("Requete de l'API web: " + adresse)
    request({ url: adresse, method: "DELETE" }, function (error, response) {
      if (!error && response.statusCode == 204) {
        store.dispatch({
          type: types.DELETE_RENCONTRE_SUCCESS,
          idRencontre: idRencontre
        })
      }
    })
  },
  ajoutRencontre: function (infos) {
    let rencontre = this.props.rencontre
    console.info("Info: " + JSON.stringify(infos))
    rencontre.date = infos.date
    rencontre.periode = infos.periode
    rencontre.hote.nom = infos.hote
    rencontre.visiteur.nom = infos.visiteur
    console.log("Ajout rencontre : " + JSON.stringify(rencontre))
    var adresse = location.protocol + "//" + location.host + "/api/rencontres"
    console.info("Requete de l'API web: " + adresse)
    request({ url: adresse, method: "POST", json: rencontre }, function (error, response, rencontres) {
      if (!error && response.statusCode == 201) {
        // Calcul de l'identifiant de la nouvelle rencontre
        let [, id] = /^\/api\/rencontres\/(.*)$/.exec(response.headers.location);
        // let id = response.headers.location.replace(new RegExp("/api\/rencontre\/(.*)"), "$1")
        console.info("id: " + id)
        rencontre.id = id
        console.info("Rencontre: " + JSON.stringify(rencontre))
        store.dispatch({
          type: types.POST_RENCONTRE_SUCCESS,
          rencontre: rencontre
        })
      }
    })
  },
  render: function () {
    return (
      this.props.modeAjout ?
        <RencontreAjout
          rencontre={this.props.rencontre}
          ajoutRencontre={this.ajoutRencontre}/>
        :
        <Rencontres rencontres={this.props.rencontres}
          supprimeRencontre={this.supprimeRencontre}
          ajouterRencontre={this.ajouterRencontre}/>
    )
  }
})

const mapStateToProps = function (store) {
  return {
    rencontres: store.rencontreState.rencontres,
    rencontre: store.rencontreState.rencontre,
    modeAjout: store.rencontreState.modeAjout
  }
}

export default connect(mapStateToProps)(RencontresConteneur);
