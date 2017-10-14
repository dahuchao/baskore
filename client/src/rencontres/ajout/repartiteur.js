import {types, action$} from "../rencontres-actions"

const etat$ = action$.scan((etat, action) => {
  console.log("##############################")
  console.log("\\ ACTION: " + JSON.stringify(action.type))
  let actions = {
    "DEFAUT": function () {
      console.log(`| Action par défaut`)
      return etat
    }
  }
  actions[types.INIT] = function () {
    console.log("| initialisation: " + JSON.stringify(action.props))
    return action.props.rencontre
  }
  actions[types.NOUV_DATE] = function () {
    console.log("| nouvelle date: " + JSON.stringify(action.date.getDate()))
    const rencontre = {...etat}
    let date = rencontre.date
    date.setDate(action.date.getDate())
    date.setMonth(action.date.getMonth())
    date.setFullYear(action.date.getFullYear())
    return rencontre
  }
  actions[types.NOUV_HEURE] = function () {
    console.log("| nouvelle heure: " + action.heure)
    const rencontre = {...etat}
    let date = rencontre.date
    date.setHours(action.heure.getHours())
    date.setMinutes(action.heure.getMinutes())
    return rencontre
  }
  actions[types.NOUV_HOTE] = function () {
    console.log("| nouveau hote: " + JSON.stringify(action.hote))
    const rencontre = {...etat}
    rencontre.hote.nom = action.hote
    return rencontre
  }
  actions[types.NOUV_VISITEUR] = function () {
    console.log("| nouveau visiteur: " + JSON.stringify(action.visiteur))
    const rencontre = {...etat}
    rencontre.visiteur.nom = action.visiteur
    return rencontre
  }
  return (actions[action.type] || actions['DEFAUT'])()
}, null)

export {etat$}
