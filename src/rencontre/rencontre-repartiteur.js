import Rx from 'rxjs'
import Immutable from "immutable"
import * as types from "./rencontre-actions"
import typesEvenement from "../types-evenement"

export default function Repartiteur() {
  const action$ = new Rx.BehaviorSubject({type: "DEFAUT"})
  const init = {
    modeHistogramme: false,
    modeEdition: false,
    modeVerrouille: true
  }
  const etat$ = action$.scan((etat, action) => {
    console.debug("##############################")
    console.debug("\\ ACTION: " + JSON.stringify(action.type))
    let actions = {
      "DEFAUT": function () {
        console.debug(`| Action par défaut`)
        return Immutable.fromJS(etat)
      }
    }
    actions[types.TERMINAISON] = function () {
      console.debug("| terminaison.")
      return Immutable
        .fromJS(etat)
        .setIn([
          'rencontre', 'termine'
        ], !etat.rencontre.termine)
    }
    actions[types.VERROUILLAGE] = function () {
      console.debug("| verrouillage.")
      return Immutable
        .fromJS(etat)
        .set("modeVerrouille", !etat.modeVerrouille)
    }
    actions[typesEvenement.LECTURE_RENCONTRE] = function () {
      console.debug("| rencontre: " + JSON.stringify(action.rencontre))
      if (action.rencontre == null) 
        return Immutable.fromJS(etat)
      let rencontre = Immutable.fromJS(action.rencontre)
      const joueuses = Immutable
        .List
        .of(4, 5, 6, 7, 8)
      rencontre = rencontre.setIn([
        'hote', 'joueuses'
      ], joueuses)
      rencontre = rencontre.setIn([
        'visiteur', 'joueuses'
      ], joueuses)
      // rencontre = rencontre.setIn(['histoMarques'], [])
      return Immutable
        .fromJS(etat)
        .set("rencontre", rencontre)
    }
    actions[types.EDITER_RENCONTRE] = function () {
      console.debug("| Mode édition: " + JSON.stringify(etat.modeEdition))
      return Immutable
        .fromJS(etat)
        .set("modeEdition", !etat.modeEdition)
    }
    actions[types.HISTORIQUE_RENCONTRE] = function () {
      console.debug("| Mode histogramme: " + JSON.stringify(etat.modeHistogramme))
      return Immutable
        .fromJS(etat)
        .set("modeHistogramme", !etat.modeHistogramme)
    }
    actions[typesEvenement.CHANGEMENT_MARQUE] = function () {
      console.debug(`| Nouvelle marque ${action.marqueHote}:${action.marqueVisiteur}`)
      const periode = Immutable
        .fromJS(etat)
        .get("rencontre")
        .get("periode");
      const histoMarques = Immutable
        .fromJS(etat)
        .get("rencontre")
        .get("histoMarques",[])
        .push({
          marqueHote: action.marqueHote, 
          marqueVisiteur: action.marqueVisiteur,
          periode: periode
        });
      return Immutable
        .fromJS(etat)
        .setIn([
          'rencontre', 'hote', 'marque'
        ], action.marqueHote)
        .setIn([
          'rencontre', 'visiteur', 'marque'
        ], action.marqueVisiteur)
        .setIn([
          'rencontre', 'histoMarques'
        ], histoMarques)
    }
    actions[typesEvenement.MAJ_RENCONTRE] = function () {
      console.debug("| Mise à jour: " + JSON.stringify(action.rencontre))
      const joueuses = Immutable
        .List
        .of(4, 5, 6, 7, 8)
      const netat = Immutable
        .fromJS(etat)
        .set("rencontre", Immutable.fromJS(action.rencontre))
      console.debug(`| netat: ${netat}`)
      return netat
        .setIn([
          "rencontre", "hote", "joueuses"
        ], joueuses)
        .setIn([
          "rencontre", "visiteur", "joueuses"
        ], joueuses)
        .setIn([
          "rencontre",'histoMarques'
        ], [])
        .set("modeEdition", false)
      // return Immutable   .fromJS(etat)   .set("rencontre", rencontre)
      // .set("modeEdition", false)
    }
    actions[typesEvenement.CHANGEMENT_PERIODE] = function () {
      console.debug("| Nouvelle période: " + JSON.stringify(action.periode))
      return Immutable
        .fromJS(etat)
        .setIn([
          'rencontre', 'periode'
        ], action.periode)
    }
    actions[typesEvenement.NOUVEAU_COMMENTAIRE] = function () {
      console.debug(`| Nouveau commentaire sur la rencontre: ${action.commentaire}`)
      let nouvelEtat = Immutable.fromJS(etat)
      console.debug(`| **************** etat : ${nouvelEtat}`)
      let rencontre = nouvelEtat.get("rencontre")
      if (!rencontre) 
        return nouvelEtat
      console.debug(`| ****rencontre: ${rencontre}`)
      let commentaires = rencontre
        .get("commentaires", Immutable.List())
        .push(action.commentaire)
      console.debug(`| ****commentaires: ${commentaires}`)
      rencontre = rencontre.set("commentaires", commentaires)
      console.debug(`| ****rencontre: ${rencontre}`)
      return Immutable
        .fromJS(etat)
        .set("rencontre", rencontre)
    }
    actions[types.CHANGEMENT_JOUEUR_HOTE] = function () {
      console.debug(`| Nouvelles joueuses hote : ${action.joueuses}`)
      return Immutable
        .fromJS(etat)
        .setIn([
          'rencontre', 'hote', 'joueuses'
        ], action.joueuses)
    }
    actions[types.CHANGEMENT_JOUEUR_VISITEUR] = function () {
      console.debug(`| Nouvelles joueuses visiteur : ${action.joueuses}`)
      return Immutable
        .fromJS(etat)
        .setIn([
          'rencontre', 'visiteur', 'joueuses'
        ], action.joueuses)
    }
    let etatNouveau = (actions[action.type] || actions['DEFAUT'])();
    console.debug("/----- Nouvel état ----------------")
    console.debug(`${JSON.stringify(etatNouveau.toJS())}`)
    console.debug(">----------------------------------")
    return etatNouveau.toJS()
  }, init)
  return {etat$, action$}
}