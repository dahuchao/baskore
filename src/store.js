import {createStore, combineReducers} from "redux"
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
        "DEFAUT": function () {
            return Immutable.fromJS(state)
        }
    }
    actions[types.GET_RENCONTRES_SUCCESS] = function () {
        console.log("| rencontres: " + JSON.stringify(action.rencontres))
        return Immutable
            .fromJS(state)
            .set("rencontres", action.rencontres)
    }
    actions[types.GET_RENCONTRE_SUCCESS] = function () {
        console.log("| rencontre: " + JSON.stringify(action.rencontre))
        let commentaires = Immutable
            .List()
            .push({commentaire: "Morgane entre sur le terrain à la place de Jacqueline", valide: true})
            .push({commentaire: "Panier magnifique de Tifanie", valide: true})
            .push({commentaire: "Les visiteurs dominent la partie", valide: true})
            .push({commentaire: "Dans la raquette les interieurs dominent sans partage", valide: true})
            .push({commentaire: "Superbe action des Nantaises qui malheureusement ne donnera rien", valide: true})
        let rencontreAvecCommentaire = Immutable
            .fromJS(action.rencontre)
            .set("commentaires", commentaires)
        return Immutable
            .fromJS(state)
            .set("rencontre", rencontreAvecCommentaire)
    }
    actions[types.POST_RENCONTRE_SUCCESS] = function () {
        console.log("| rencontre (nouvelle): " + JSON.stringify(action.rencontre))
        let rencontres = Immutable
            .fromJS(state)
            .get("rencontres")
            .push(action.rencontre)
        return Immutable
            .fromJS(state)
            .set("rencontres", rencontres)
            .set("modeAjout", false)
    }
    actions[types.DELETE_RENCONTRE_SUCCESS] = function () {
        console.log("| rencontre (supprimée): " + action.idRencontre)
        let rencontres = state
            .rencontres
            .filter(rencontre => rencontre.id != action.idRencontre)
        return Immutable
            .fromJS(state)
            .set("rencontres", rencontres)
    }
    actions[types.EDITER_RENCONTRE] = function () {
        console.log("| Mode édition: " + JSON.stringify(state.modeEdition))
        return Immutable
            .fromJS(state)
            .set("modeEdition", !state.modeEdition)
    }
    actions[types.PUT_RENCONTRE_SUCCESS] = function () {
        console.log("| rencontre: " + JSON.stringify(action.rencontre))
        return Immutable
            .fromJS(state)
            .set("rencontre", action.rencontre)
            .set("modeEdition", false)
    }
    actions[types.NOUVELLE_INFO] = function () {
        console.log("| rencontre: " + JSON.stringify(action.rencontre))
        return Immutable
            .fromJS(state)
            .set("rencontre", action.rencontre)
    }
    actions[types.AJOUTER_RENCONTRE] = function () {
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
        console.log("| Mode ajout: " + JSON.stringify(state.modeAjout))
        return Immutable
            .fromJS(state)
            .set("rencontre", rencontre)
            .set("modeAjout", !state.modeAjout)
    }
    actions[types.ANNULER_RENCONTRE] = function () {
        console.log("| Annulation de l'ajout d'une rencontre.")
        return Immutable
            .fromJS(state)
            .set("modeAjout", !state.modeAjout)
    }
    actions[types.NOUVELLE] = function () {
        console.log("| Nouvelle période: " + JSON.stringify(action.periode))
        console.log("| Nouvelle période (rencontre): " + JSON.stringify(state.rencontre))
        let rencontre = Immutable
            .fromJS(state)
            .get("rencontre")
            .set("periode", action.periode)
        console.log("| Nouvelle période (nouvelle rencontre): " + JSON.stringify(rencontre))
        return Immutable
            .fromJS(state)
            .set("rencontre", rencontre)
    }
    actions[types.COMMENTAIRE_POST] = function () {
        let commentaire = action.commentaire
        console.log(` Nouveau commentaire sur la rencontre: ${commentaire}`)
        let rencontre = Immutable
            .fromJS(state)
            .get("rencontre")
        let commentaires = rencontre
            .get("commentaires")
            .push({commentaire: commentaire, valide: false})
        rencontre = rencontre.set("commentaires", commentaires)
        return Immutable
            .fromJS(state)
            .set("rencontre", rencontre)
    }
    actions[types.COMMENTAIRE_NOUVEAU] = function () {
        let commentaire = action.commentaire
        console.log(` Nouveau commentaire sur la rencontre: ${commentaire}`)
        let rencontre = Immutable
            .fromJS(state)
            .get("rencontre")
        let commentaires = rencontre
            .get("commentaires")
            .map(commentaire => {
                return commentaire.set("valide", true)
                // return commentaire
            })
        rencontre = rencontre.set("commentaires", commentaires)
        return Immutable
            .fromJS(state)
            .set("rencontre", rencontre)
    }
    let nouveauState = (actions[action.type] || actions['DEFAUT'])();
    console.log("Nouvel état: " + nouveauState)
    console.log("-------------------")
    return nouveauState.toJS();
}

var reducers = combineReducers({rencontreState: rencontreReducer})
const store = createStore(reducers)
export default store
