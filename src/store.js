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
    let actions = {
        "GET_RENCONTRES_SUCCESS": function () {
            console.log("| rencontres: " + JSON.stringify(action.rencontres))
            // return Object.assign({}, state, { rencontres: action.rencontres })
            return Immutable.fromJS(state)
                .set("rencontres", action.rencontres)
        },
        "GET_RENCONTRE_SUCCESS": function () {
            console.log("| rencontre: " + JSON.stringify(action.rencontre))
            let commentaires = Immutable.List()
                .push("Morgane entre sur le terrain à la place de Jacqueline")
                .push("Panier magnifique de Tifanie")
                .push("Les visiteurs dominent la partie")
                .push("Dans la raquette les interieurs dominent sans partage")
                .push("Superbe action des Nantaises qui malheureusement ne donnera rien")
            let rencontreAvecCommentaire = Immutable.fromJS(action.rencontre).set("commentaires", commentaires)
            return Immutable.fromJS(state)
                .set("rencontre", rencontreAvecCommentaire)
            // nouveauState = Object.assign({}, state, { rencontre: action.rencontre })
        },
        "POST_RENCONTRE": function () {
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
            // return Object.assign({}, state, { rencontre: initRencontre })
            return Immutable.fromJS(state)
                .set("rencontre", initRencontre)
        },
        "POST_RENCONTRE_SUCCESS": function () {
            console.log("| rencontre (nouvelle): " + JSON.stringify(action.rencontre))
            // let liste = [...state.rencontres, action.rencontre]
            let rencontres = Immutable.fromJS(state)
                .get("rencontres")
                .push(action.rencontre)
            // state.rencontres.push(action.rencontre)
            // let nouveauState = Object.assign({}, state, { rencontres: liste })
            // return Object.assign({}, nouveauState, { modeAjout: false })
            return Immutable.fromJS(state)
                .set("rencontres", rencontres)
                .set("modeAjout", false)
        },
        "DELETE_RENCONTRE_SUCCESS": function () {
            console.log("| rencontre (supprimée): " + action.idRencontre)
            let rencontres = state.rencontres.filter(rencontre => rencontre.id != action.idRencontre)
            return Immutable.fromJS(state)
                .set("rencontres", rencontres)
        },
        "EDITER_RENCONTRE": function () {
            console.log("| Mode édition: " + JSON.stringify(state.modeEdition))
            // return Object.assign({}, state, { modeEdition: !state.modeEdition })
            return Immutable.fromJS(state)
                .set("modeEdition", !state.modeEdition)
        },
        "PUT_RENCONTRE_SUCCESS": function () {
            console.log("| rencontre: " + JSON.stringify(action.rencontre))
            // let nouveauState = Object.assign({}, state, { rencontre: action.rencontre })
            // return Object.assign({}, nouveauState, { modeEdition: false })
            return Immutable.fromJS(state)
                .set("rencontre", action.rencontre)
                .set("modeEdition", false)
        },
        "NOUVELLE_INFO": function () {
            console.log("| rencontre: " + JSON.stringify(action.rencontre))
            // return Object.assign({}, state, { rencontre: action.rencontre })
            return Immutable.fromJS(state)
                .set("rencontre", action.rencontre)
        },
        "AJOUTER_RENCONTRE": function () {
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
            // let nouveauState = Object.assign({}, state, { rencontre: rencontre })
            console.log("| Mode ajout: " + JSON.stringify(state.modeAjout))
            // return Object.assign({}, nouveauState, { modeAjout: !state.modeAjout })
            return Immutable.fromJS(state)
                .set("rencontre", rencontre)
                .set("modeAjout", !state.modeAjout)
        },
        "ANNULER_RENCONTRE": function () {
            console.log("| Annulation de l'ajout d'une rencontre.")
            // return Object.assign({}, nouveauState, { modeAjout: !state.modeAjout })
            return Immutable.fromJS(state)
                .set("modeAjout", !state.modeAjout)
        },
        "NOUVEAU_COMMENTAIRE": function () {
            let commentaire = action.commentaire
            console.log(` Nouveau commentaire sur la rencontre: ${commentaire}`)
            let rencontre = Immutable.fromJS(state)
                .get("rencontre")
            let commentaires = rencontre.get("commentaires")
                .push(commentaire)
            rencontre = rencontre.set("commentaires", commentaires)
            return Immutable.fromJS(state)
                .set("rencontre", rencontre)
        },
        "NOUVELLE": function () {
            console.log("| Nouvelle période: " + JSON.stringify(action.periode))
            console.log("| Nouvelle période (rencontre): " + JSON.stringify(state.rencontre))
            // let rencontre = Object.assign(state.rencontre, { periode: action.periode })
            let rencontre = Immutable.fromJS(state)
                .get("rencontre")
                .set("periode", action.periode)
            console.log("| Nouvelle période (nouvelle rencontre): " + JSON.stringify(rencontre))
            // return Object.assign({}, state, { rencontre: nouvelleRencontre })
            return Immutable.fromJS(state)
                .set("rencontre", rencontre)
        },
        "DEFAUT": function () {
            return Immutable.fromJS(state)
        }
    }

    let nouveauState = (actions[action.type] || actions['DEFAUT'])();
    console.log("Nouvel état: " + nouveauState)
    console.log("-------------------")
    return nouveauState
        .toJS();
}

var reducers = combineReducers({
    rencontreState: rencontreReducer
})
const store = createStore(reducers)
export default store
