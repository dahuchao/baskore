import Rx from 'rxjs'

const types = {
    CREER_RENCONTRE : "CREER_RENCONTRE",
    AJOUT_RENCONTRE : "AJOUT_RENCONTRE",
    ANNULER_RENCONTRE : "ANNULER_RENCONTRE",
    // Ajout d'une rencontre
    INIT: "INIT",
    NOUV_DATE: "NOUV_DATE",
    NOUV_HEURE: "NOUV_HEURE",
    NOUV_HOTE: "NOUV_HOTE",
    NOUV_VISITEUR: "NOUV_VISITEUR"
  }
const action$ = new Rx.BehaviorSubject({type: "DEFAUT"})
export {types, action$}