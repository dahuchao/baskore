import Rx from 'rxjs'
import Immutable from "immutable"
import * as types from "./rencontre-actions"
var typesEvenement = require("../types-evenement")

export default function Repartiteur() {
  const action$ = new Rx.BehaviorSubject({ type: "DEFAUT" })

  const init = {
    modeEdition: false,
    modeVerrouille: false
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
    actions[typesEvenement.CHANGEMENT_MARQUE] = function () {
      console.log(`| Nouvelle marque ${action.marqueHote}:${action.marqueVisiteur}`)
      let rencontre = Immutable
        .fromJS(etat)
        .get("rencontre")

      return Immutable
        .fromJS(etat)
        .setIn(['rencontre', 'hote', 'marque'], action.marqueHote)
        .setIn(['rencontre', 'visiteur', 'marque'], action.marqueVisiteur)
    }
    actions[types.PUT_RENCONTRE_SUCCESS] = function () {
      console.log("| rencontre: " + JSON.stringify(action.rencontre))
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
      // console.log("| Nouvelle période (rencontre): " + JSON.stringify(etat.rencontre))
      let rencontre = Immutable
        .fromJS(etat)
        .get("rencontre")
        .set("periode", action.periode)
      // console.log("| Nouvelle période (nouvelle rencontre): " + JSON.stringify(rencontre))
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
    }
    actions[typesEvenement.NOUVEAU_COMMENTAIRE] = function () {
      let commentaire = action.commentaire
      console.log(` Nouveau commentaire sur la rencontre: ${commentaire}`)
      let rencontre = Immutable
        .fromJS(etat)
        .get("rencontre")
      let commentaires = rencontre
        .get("commentaires")
        .push({ commentaire: commentaire, valide: true })
      rencontre = rencontre.set("commentaires", commentaires)
      return Immutable
        .fromJS(etat)
        .set("rencontre", rencontre)
    }
    actions[types.CHANGEMENT_JOUEUR_HOTE] = function () {
      console.log(` Joueur sortant: ${action.sortant}`)
      console.log(` Joueur entrant: ${action.entrant}`)
      return Immutable.fromJS(etat)
    }
    actions[types.CHANGEMENT_JOUEUR_VISITEUR] = function () {
      console.log(` Joueur sortant: ${action.sortant}`)
      console.log(` Joueur entrant: ${action.entrant}`)
      return Immutable.fromJS(etat)
    }
    let etatNouveau = (actions[action.type] || actions['DEFAUT'])();
    console.log("Nouvel état: " + etatNouveau)
    console.log("-------------------")
    return etatNouveau.toJS()
  }, init)
  return { etat$, action$ }
}