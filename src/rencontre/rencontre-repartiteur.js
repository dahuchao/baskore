import Rx from 'rxjs'
import Immutable from "immutable"
import * as types from "./rencontre-actions"
var typesEvenement = require("../types-evenement")

export default function Repartiteur() {
  const action$ = new Rx.BehaviorSubject({type: "DEFAUT"})
  const init = {
    modeEdition: false,
    modeVerrouille: false
  }
  const etat$ = action$.scan((etat, action) => {
    console.log("##############################")
    console.log("\\ ACTION: " + JSON.stringify(action.type))
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
      const joueuses = Immutable
        .List
        .of(4, 5, 6, 7, 8)
      let rencontre = Immutable
        .fromJS(action.rencontre)
        .setIn([
          'hote', 'joueuses'
        ], joueuses)
      rencontre = rencontre.setIn([
        'visiteur', 'joueuses'
      ], joueuses)
      return Immutable
        .fromJS(etat)
        .set("rencontre", rencontre)
    }
    actions[types.EDITER_RENCONTRE] = function () {
      console.log("| Mode édition: " + JSON.stringify(etat.modeEdition))
      return Immutable
        .fromJS(etat)
        .set("modeEdition", !etat.modeEdition)
    }
    actions[typesEvenement.CHANGEMENT_MARQUE] = function () {
      console.log(`| Nouvelle marque ${action.marqueHote}:${action.marqueVisiteur}`)
      return Immutable
        .fromJS(etat)
        .setIn([
          'rencontre', 'hote', 'marque'
        ], action.marqueHote)
        .setIn([
          'rencontre', 'visiteur', 'marque'
        ], action.marqueVisiteur)
    }
    actions[types.PUT_RENCONTRE_SUCCESS] = function () {
      console.log("| Mise à jour de la rencontre: " + JSON.stringify(action.rencontre))
      // let rencontre = Immutable   .fromJS(etat)   .get("rencontre",new Object)
      // .set("date", action.rencontre.date)   .set("periode",
      // action.rencontre.periode)   .set("hote.nom", action.rencontre.hote.nom)
      // .set("visiteur.nom", action.rencontre.visiteur.nom) return Immutable
      // .fromJS(etat)   .set("rencontre", rencontre)   .set("modeEdition", false)
      return Immutable
        .fromJS(etat)
        .set("rencontre", action.rencontre)
        .set("modeEdition", false)
    }
    actions[typesEvenement.CHANGEMENT_PERIODE] = function () {
      console.log("| Nouvelle période: " + JSON.stringify(action.periode))
      return Immutable
        .fromJS(etat)
        .setIn([
          'rencontre', 'periode'
        ], action.periode)
    }
    actions[typesEvenement.NOUVEAU_COMMENTAIRE] = function () {
      console.log(`| Nouveau commentaire sur la rencontre: ${action.commentaire}`)
      let commentaires = Immutable
        .fromJS(etat)
        .get("rencontre")
        .get("commentaires")
        .push(action.commentaire)
      return Immutable
        .fromJS(etat)
        .setIn([
          'rencontre', 'commentaires'
        ], commentaires)
    }
    actions[types.CHANGEMENT_JOUEUR_HOTE] = function () {
      console.log(`| Nouvelles joueuses hote : ${action.joueuses}`)
      return Immutable
        .fromJS(etat)
        .setIn([
          'rencontre', 'hote', 'joueuses'
        ], action.joueuses)
    }
    actions[types.CHANGEMENT_JOUEUR_VISITEUR] = function () {
      console.log(`| Nouvelles joueuses visiteur : ${action.joueuses}`)
      return Immutable
        .fromJS(etat)
        .setIn([
          'rencontre', 'visiteur', 'joueuses'
        ], action.joueuses)
    }
    let etatNouveau = (actions[action.type] || actions['DEFAUT'])();
    console.log("/----- Nouvel état ----------------")
    console.log(`${etatNouveau}`)
    console.log(">----------------------------------")
    return etatNouveau.toJS()
  }, init)
  return {etat$, action$}
}