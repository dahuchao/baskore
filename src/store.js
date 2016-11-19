import {createStore, combineReducers} from "redux"
import * as types from "./actions/actions-types"
import Immutable from "immutable"

const initState = {
    rencontres: [],
    modeEdition: false,
    modeAjout: false,
    modeVerrouille: false
}

function rencontreReducer(state = initState, action) {
    console.log("##############################")
    console.log("| ACTION: " + JSON.stringify(action.type))
    let actions = {
        "DEFAUT": function () {
            return Immutable.fromJS(state)
        }
    }
    actions[types.VERROUILLAGE] = function () {
        console.log("| verrouillage.")
        return Immutable
            .fromJS(state)
            .set("modeVerrouille", !state.modeVerrouille)
    }
    actions[types.GET_RENCONTRES_SUCCESS] = function () {
        console.log("| rencontres: " + JSON.stringify(action.rencontres))
        return Immutable
            .fromJS(state)
            .set("rencontres", action.rencontres)
    }
    actions[types.GET_RENCONTRE_SUCCESS] = function () {
        console.log("| rencontre: " + JSON.stringify(action.rencontre))
        let rencontre = Immutable.fromJS(action.rencontre)
        let commentaires = rencontre.get("commentaires")
            .reduce((commentaires, nouvCommentaire) => commentaires
                .push({commentaire: nouvCommentaire, valide: true}), Immutable.List()) 
        // let joueuses = rencontre
        //     .getIn(["hote","joueuses"], Immutable.List.of(4, 5, 6, 7, 8))
        rencontre = rencontre.setIn(["hote","joueuses"], rencontre
            .getIn(["hote","joueuses"], Immutable.List.of(4, 5, 6, 7, 8)))
        rencontre = rencontre.setIn(["visiteur","joueuses"], rencontre
            .getIn(["visiteur","joueuses"], Immutable.List.of(4, 5, 6, 7, 8)))
        rencontre = rencontre.set("commentaires", commentaires)
        // let etat = Immutable.fromJS(state)
        return Immutable.fromJS(state).set("rencontre", rencontre)
    }
    actions[types.CHANGEMENT_HOTE] = function () {
        console.debug(`Changement hote ${action.sortant} par ${action.entrant}`)
        let joueuses = Immutable
            .fromJS(state)
            .getIn(["rencontre","hote","joueuses"])
            .map(joueuse => joueuse==action.sortant ? action.entrant : joueuse)
        return Immutable
            .fromJS(state).setIn(["rencontre", "hote", "joueuses"], joueuses)
    }
    actions[types.CHANGEMENT_VISITEUR] = function () {
        console.debug(`Changement visiteur ${action.sortant} par ${action.entrant}`)
        let joueuses = Immutable
            .fromJS(state)
            .getIn(["rencontre","visiteur","joueuses"])
            .map(joueuse => joueuse==action.sortant ? action.entrant : joueuse)
        return Immutable
            .fromJS(state).setIn(["rencontre", "visiteur", "joueuses"], joueuses)
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
        let rencontre = Immutable
            .fromJS(state)
            .get("rencontre")
            .set("date",action.rencontre.date)
            .set("periode",action.rencontre.periode)
            .set("hote.nom",action.rencontre.hote.nom)
            .set("visiteur.nom",action.rencontre.visiteur.nom)
        return Immutable
            .fromJS(state)
            .set("rencontre", rencontre)
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
