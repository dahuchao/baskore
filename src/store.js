import { createStore, combineReducers } from "redux"
import * as types from "./actions/actions-types"
import Immutable from "immutable"


const initState = {
    rencontres: [],
    modeEdition: false,
    modeAjout: false
}

function rencontreReducer(state = initState, action) {
    console.log("##############################")
    console.log("| ACTION: " + JSON.stringify(action.type))
    let nouveauState = state
    switch (action.type) {
        case types.GET_RENCONTRES_SUCCESS:
            console.log("| rencontres: " + JSON.stringify(action.rencontres))
            nouveauState = Object.assign({}, state, { rencontres: action.rencontres })
            break
        case types.GET_RENCONTRE_SUCCESS:
            console.log("| rencontre: " + JSON.stringify(action.rencontre))
            let commentaires = Immutable.List()
                .push("Morgane entre sur le terrain à la place de Jacqueline")
                .push("Panier magnifique de Tifanie")
                .push("Les visiteurs dominent la partie")
                .push("Dans la raquette les interieurs dominent sans partage")
                .push("Superbe action des Nantaises qui malheureusement ne donnera rien")
            let rencontreAvecCommentaire = Immutable.fromJS(action.rencontre).set("commentaires", commentaires)
            nouveauState = Immutable.fromJS(state).set("rencontre", rencontreAvecCommentaire).toJS()
            // nouveauState = Object.assign({}, state, { rencontre: action.rencontre })
            break
        case types.POST_RENCONTRE:
            let initRencontre = {
                id: 0,
                date: new Date(),
                periode: 1,
                hote: {
                    nom: "",
                    marque: 0
                },
                visiteur: {
                    nom: "",
                    marque: 0
                }
            }
            nouveauState = Object.assign({}, state, { rencontre: initRencontre })
            break
        case types.POST_RENCONTRE_SUCCESS:
            console.log("| rencontre (nouvelle): " + JSON.stringify(action.rencontre))
            let liste = [...state.rencontres, action.rencontre]
            // state.rencontres.push(action.rencontre)
            nouveauState = Object.assign({}, state, { rencontres: liste })
            nouveauState = Object.assign({}, nouveauState, { modeAjout: false })
            break
        case types.PUT_RENCONTRE_SUCCESS:
            console.log("| rencontre: " + JSON.stringify(action.rencontre))
            nouveauState = Object.assign({}, state, { rencontre: action.rencontre })
            nouveauState = Object.assign({}, nouveauState, { modeEdition: false })
            break
        case types.DELETE_RENCONTRE_SUCCESS:
            console.log("| rencontre (supprimée): " + action.idRencontre)
            let rencontres = state.rencontres.filter(rencontre => rencontre.id != action.idRencontre)
            nouveauState = Object.assign({}, state, { rencontres: rencontres })
            break
        case types.NOUVELLE_INFO:
            console.log("| rencontre: " + JSON.stringify(action.rencontre))
            nouveauState = Object.assign({}, state, { rencontre: action.rencontre })
            break
        case types.AJOUTER_RENCONTRE:
            let rencontre = {
                id: 0,
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
            nouveauState = Object.assign({}, state, { rencontre: rencontre })
            nouveauState = Object.assign({}, nouveauState, { modeAjout: !state.modeAjout })
            console.log("| Mode ajout: " + JSON.stringify(state.modeAjout))
            break
        case types.ANNULER_RENCONTRE:
            console.log("| Annulation de l'ajout d'une rencontre.")
            nouveauState = Object.assign({}, nouveauState, { modeAjout: !state.modeAjout })
            break
        case types.NOUVEAU_COMMENTAIRE: 
            let commentairez = action.commentaire
            console.log(` Nouveau commentaire sur la rencontre: ${commentairez}`)
            let rencontrez = Immutable.fromJS(state)
                .get("rencontre")
            let commentairesz = rencontrez.get("commentaires")
                .push(commentairez)
            rencontrez = rencontrez.set("commentaires", commentairesz)
            nouveauState = Immutable.fromJS(state)
                .set("rencontre", rencontrez)
                .toJS()
            break
        case types.NOUVELLE:
            console.log("| Nouvelle période: " + JSON.stringify(action.periode))
            console.log("| Nouvelle période (rencontre): " + JSON.stringify(state.rencontre))
            let nouvelleRencontre = Object.assign(state.rencontre, { periode: action.periode })
            console.log("| Nouvelle période (nouvelle rencontre): " + JSON.stringify(nouvelleRencontre))
            nouveauState = Object.assign({}, state, { rencontre: nouvelleRencontre })
            break
        case types.EDITER_RENCONTRE:
            nouveauState = Object.assign({}, state, { modeEdition: !state.modeEdition })
            console.log("| Mode édition: " + JSON.stringify(state.modeEdition))
            break
    }
    console.log("Nouvel état: " + JSON.stringify(nouveauState))
    console.log("-------------------")
    return nouveauState;
}

var reducers = combineReducers({
    rencontreState: rencontreReducer
})
const store = createStore(reducers)
export default store
