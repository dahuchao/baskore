import React from "react"
import Rx from 'rxjs'
import Immutable from "immutable"
import * as types from "./rencontre-actions"
import request from "request"
import io from "socket.io-client"
import Rencontre from "./rencontre"

const action$ = new Rx.BehaviorSubject({ type: "DEFAUT" })

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

export { etat$, action$ }