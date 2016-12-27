import React from "react"
import action$ from "../repartiteur"
import Immutable from "immutable"
import * as types from "../actions/actions-types"
import request from "request"
import Rencontres from "./rencontres"
import RencontreAjout from "./rencontres-ajout"

const init = {
  rencontres: [],
  modeAjout: false
}

const etat$ = action$.scan((etat, action) => {
  console.log("##############################")
  console.log("| ACTION: " + JSON.stringify(action.type))
  let actions = {
    "DEFAUT": function () {
      return Immutable.fromJS(etat)
    }
  }
  actions[types.GET_RENCONTRES_SUCCESS] = function () {
    console.log("| rencontres: " + JSON.stringify(action.rencontres))
    return Immutable
      .fromJS(etat)
      .set("rencontres", action.rencontres)
  }
  actions[types.AJOUTER_RENCONTRE] = function () {
    let rencontre = {
      id: 0,
      date: new Date(),
      hote: {
        nom: "",
        marque: 0
      },
      visiteur: {
        nom: "",
        marque: 0
      }
    }
    console.log("| Mode ajout: " + JSON.stringify(etat.modeAjout))
    return Immutable
      .fromJS(etat)
      .set("rencontre", rencontre)
      .set("modeAjout", !etat.modeAjout)
  }
  actions[types.ANNULER_RENCONTRE] = function () {
    console.log("| Annulation de l'ajout d'une rencontre.")
    return Immutable
      .fromJS(etat)
      .set("modeAjout", !etat.modeAjout)
  }
  let etatNouveau = (actions[action.type] || actions['DEFAUT'])();
  console.log("Nouvel état: " + etatNouveau)
  console.log("-------------------")
  return etatNouveau.toJS()
}, init)

export default class RencontresConteneur extends React.Component {
  componentWillMount() {
    etat$.subscribe(etat => this.setState(etat))
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
          ajoutRencontre={this.ajoutRencontre} />
        :
        <Rencontres rencontres={this.state.rencontres}
          supprimeRencontre={this.supprimeRencontre}
          ajouterRencontre={this.ajouterRencontre} />
    )
  }
}
