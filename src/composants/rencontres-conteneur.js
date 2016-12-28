import React from "react"
import action$ from "../repartiteur"
import etat$ from "./rencontres-repartiteur"
import Immutable from "immutable"
import * as types from "../actions/actions-types"
import request from "request"
import Rencontres from "./rencontres"
import RencontreAjout from "./rencontres-ajout"

export default class RencontresConteneur extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rencontres: [],
      modeAjout: false
    }
  }
  componentWillMount() {
    var adresse = location.protocol + "//" + location.host + "/api/rencontres"
    console.info("Requete de l'API web: " + adresse)
    request(adresse, function (error, response, rencontres) {
      if (!error && response.statusCode == 200) {
        let oRencontres = JSON.parse(rencontres)
        action$.next({
          type: types.GET_RENCONTRES_SUCCESS,
          rencontres: oRencontres
        })
      }
    })
  }
  componentDidMount() {
    etat$.subscribe(etat => this.setState(etat))
  }
  ajouterRencontre() {
    console.log("Ajouter rencontre.")
    action$.next({
      type: types.AJOUTER_RENCONTRE
    })
  }
  supprimeRencontre(idRencontre) {
    console.info("Suppression: " + idRencontre)
    var adresse = location.protocol + "//" + location.host + "/api/rencontres/" + idRencontre
    console.info("Requete de l'API web: " + adresse)
    request({ url: adresse, method: "DELETE" }, function (error, response) {
      if (!error && response.statusCode == 204) {
        action$.next({
          type: types.DELETE_RENCONTRE_SUCCESS,
          idRencontre: idRencontre
        })
      }
    })
  }
  ajoutRencontre(infos) {
    if (infos == null) {
      action$.next({
        type: types.ANNULER_RENCONTRE,
        rencontre: rencontre
      })
      return
    }
    let rencontre = this.state.rencontre
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
        action$.next({
          type: types.POST_RENCONTRE_SUCCESS,
          rencontre: rencontre
        })
      }
    })
  }
  render() {
    return (
      this.state.modeAjout ?
        <RencontreAjout
          rencontre={this.state.rencontre}
          ajoutRencontre={this.ajoutRencontre.bind(this)} />
        :
        <Rencontres rencontres={this.state.rencontres}
          supprimeRencontre={this.supprimeRencontre}
          ajouterRencontre={this.ajouterRencontre} />
    )
  }
}
