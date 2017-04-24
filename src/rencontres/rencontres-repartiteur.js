import Rx from 'rxjs'
import Immutable from "immutable"
import * as types from "./rencontres-actions"
import typesEvenement from "../types-evenement"

export default function Repartiteur() {
  const action$ = new Rx.BehaviorSubject({type: "DEFAUT"})

  const init = {
    rencontres: [],
    modeAjout: false
  }

  const etat$ = action$.scan((etat, action) => {
    console.log("##############################")
    console.log("\\ ACTION: " + JSON.stringify(action.type))
    let actions = {
      "DEFAUT": function () {
        console.log(`| Action par défaut`)
        return Immutable.fromJS(etat)
      }
    }
    actions[typesEvenement.LECTURE_RENCONTRES] = function () {
      console.log("| rencontres: " + JSON.stringify(action.rencontres))
      const rencontres = Immutable
        .fromJS(action.rencontres)
        .sortBy(rencontre => rencontre.date)
        .reverse();
      return Immutable
        .fromJS(etat)
        .set("rencontres", rencontres)
    }
    actions[types.CREER_RENCONTRE] = function () {
      let rencontre = {
        id: 0,
        termine: false,
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
    actions[typesEvenement.AJOUT_RENCONTRE] = function () {
      console.log("| rencontre (nouvelle): " + JSON.stringify(action.rencontre))
      let rencontres = Immutable
        .fromJS(etat)
        .get("rencontres")
        .push(action.rencontre)
      return Immutable
        .fromJS(etat)
        .set("rencontres", rencontres)
        .set("modeAjout", false)
    }
    actions[typesEvenement.SUPPRESSION_RENCONTRE] = function () {
      // console.log("| liste des renc.: " + JSON.stringify(etat))
      console.log("| id de la rencontre à supprimer: " + action.idRencontre)
      let rencontres = etat
        .rencontres
        .filter(rencontre => rencontre.id != action.idRencontre)
      return Immutable
        .fromJS(etat)
        .set("rencontres", rencontres)
    }
    let etatNouveau = (actions[action.type] || actions['DEFAUT'])();
    console.log("/--------Nouvel état-----------")
    console.log(`${etatNouveau}`)
    console.log(">------------------------------")
    return etatNouveau.toJS()
  }, init)

  return {etat$, action$}
}