import Rx from 'rxjs'
import * as types from "./actions/actions-types"

const action$ = new Rx.BehaviorSubject({ type: "DEFAUT" });

export default action$
