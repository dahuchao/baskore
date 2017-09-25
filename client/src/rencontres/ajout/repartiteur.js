import Immutable from "immutable"
import {types, action$} from "../rencontres-actions"

const etat$ = action$.scan((etat, action) => {
  console.log("##############################")
  console.log("\\ ACTION: " + JSON.stringify(action.type))
  let actions = {
    "DEFAUT": function () {
      console.log(`| Action par défaut`)
      return Immutable.fromJS(etat)
    }
  }
  actions[types.INIT] = function () {
    console.log("| initialisation: " + JSON.stringify(action.props))
    return Immutable.fromJS(etat)
  }
  actions[types.NOUV_DATE] = function () {
    console.log("| nouvelle date: " + JSON.stringify(action.date.getDate()))
    let date = Immutable
      .fromJS(etat)
      .get("date")
    date.setDate(action.date.getDate())
    date.setMonth(action.date.getMonth())
    date.setFullYear(action.date.getFullYear())
    return Immutable
      .fromJS(etat)
      .set("date", date)
  }
  actions[types.NOUV_HEURE] = function () {
    console.log("| nouvelle heure: " + action.heure)
    let date = Immutable
      .fromJS(etat)
      .get("date")
    date.setHours(action.heure.getHours())
    date.setMinutes(action.heure.getMinutes())
    return Immutable
      .fromJS(etat)
      .set("date", date)
  }
  actions[types.NOUV_HOTE] = function () {
    console.log("| nouveau hote: " + JSON.stringify(action.hote))
    return Immutable
      .fromJS(etat)
      .set("hote", action.hote)
  }
  actions[types.NOUV_VISITEUR] = function () {
    console.log("| nouveau visiteur: " + JSON.stringify(action.visiteur))
    return Immutable
      .fromJS(etat)
      .set("visiteur", action.visiteur)
  }
  let etatNouveau = (actions[action.type] || actions['DEFAUT'])();
  return etatNouveau.toJS()
}, {date: new Date()})

export {etat$}
