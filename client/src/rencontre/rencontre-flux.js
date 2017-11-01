import {BehaviorSubject} from "rxjs/BehaviorSubject"
import {Observable} from "rxjs/Observable"
import "rxjs/add/operator/startWith"
import "rxjs/add/operator/scan"
import {reducteur, types} from "./rencontre-reducteur"

const action$ = new BehaviorSubject({type: "DEFAUT"})

const init = {
  rencontre: {
    hote: {
      marque: 0
    },
    visiteur: {
      marque: 0
    },
    periode: "P1",
    termine: false,
    histoMarques: []
  },
  modeEdition: false,
  modeVerrouille: true,
  modeHistogramme: false,
  synchronise: true
}

const etat$ = action$
  .startWith(init)
  .scan(reducteur)

export {types, action$, etat$}