import Rx from 'rxjs'

const types = {
    EDITER_RENCONTRE : "EDITER_RENCONTRE",
    HISTORIQUE_RENCONTRE : "HISTORIQUE_RENCONTRE",
    NOUVELLE : "NOUVELLE",
    NOUVELLE_PERIODE: "NOUVELLE_PERIODE",
    VERROUILLAGE: "VERROUILLAGE",
    TERMINAISON: "TERMINAISON"
  }
const action$ = new Rx.BehaviorSubject({type: "DEFAUT"})
export {types, action$}