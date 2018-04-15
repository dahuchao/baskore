import Immutable from "immutable"
import typesEvenement from "../types-evenement"
import typesCommande from "../types-commande"

const types = {
  EDITER_RENCONTRE : "EDITER_RENCONTRE",
  HISTORIQUE_RENCONTRE : "HISTORIQUE_RENCONTRE",
  VERROUILLAGE: "VERROUILLAGE",
  TERMINAISON: "TERMINAISON"
}

const reducteur = (etat, action) => {
  console.debug("##############################")
  console.debug("\\ ACTION: " + JSON.stringify(action.type))
  let actions = {
    "DEFAUT": function () {
      console.debug(`| Action par défaut`)
      return Immutable.fromJS(etat)
    }
  }
  actions[types.TERMINAISON] = function () {
    console.debug("| terminaison.")
    return Immutable
      .fromJS(etat)
      .setIn([
        'rencontre', 'termine'
      ], !etat.rencontre.termine)
  }
  actions[types.VERROUILLAGE] = function () {
    console.debug("| verrouillage.")
    return Immutable
      .fromJS(etat)
      .set("modeVerrouille", !etat.modeVerrouille)
  }
  actions[typesEvenement.LECTURE_RENCONTRE] = function () {
    // console.debug(`| rencontre: ${JSON.stringify(action.rencontre)}`)
    if (action.rencontre == null) 
      return Immutable.fromJS(etat)
    let rencontre = Immutable.fromJS(action.rencontre)
    // rencontre = rencontre.setIn(['histoMarques'], [])
    return Immutable
      .fromJS(etat)
      .set("rencontre", rencontre)
  }
  actions[types.EDITER_RENCONTRE] = function () {
    console.debug(`| Mode édition: ${JSON.stringify(etat.modeEdition)}`)
    return Immutable
      .fromJS(etat)
      .set("modeEdition", !etat.modeEdition)
  }
  actions[types.HISTORIQUE_RENCONTRE] = function () {
    console.debug(`| Mode histogramme: ${JSON.stringify(etat.modeHistogramme)}`)
    return Immutable
      .fromJS(etat)
      .set("modeHistogramme", !etat.modeHistogramme)
  }
  actions[typesEvenement.CHANGEMENT_MARQUE] = function () {
    console.debug(`| Nouvelle marque ${action.marqueHote}:${action.marqueVisiteur}`)
    const periode = {...etat.rencontre.periode}
    const histoMarques = etat.rencontre.histoMarques ? [...etat.rencontre.histoMarques] : []
    histoMarques.push({
      marqueHote: action.marqueHote, 
      marqueVisiteur: action.marqueVisiteur,
      periode: periode
    })
    const netat = {...etat}
    if (!etat.modeEdition) {
      netat.rencontre.hote.marque = action.marqueHote
      netat.rencontre.visiteur.marque = action.marqueVisiteur
      netat.rencontre.histoMarques = histoMarques
      netat.synchronise = false
    }
    let synchronise = true
    if (action.marqueHote !== etat.rencontre.hote.marque) synchronise=false
    if (action.marqueVisiteur !== etat.rencontre.visiteur.marque) synchronise=false
    netat.synchronise = synchronise
    return Immutable.fromJS(netat)
  }
  actions[typesCommande.PANIER_MARQUE] = function () {
    console.debug(`| Nouvelle marque ${action.rencontre.marqueHote}:${action.rencontre.marqueVisiteur}`)
    const periode = {...etat.rencontre.periode}
    const histoMarques = etat.rencontre.histoMarques ? [...etat.rencontre.histoMarques] : []
    histoMarques.push({
      marqueHote: action.rencontre.marqueHote, 
      marqueVisiteur: action.rencontre.marqueVisiteur,
      periode: periode
    })
    const netat = {...etat}
    netat.rencontre.hote.marque = action.rencontre.marqueHote
    netat.rencontre.visiteur.marque = action.rencontre.marqueVisiteur
    netat.rencontre.histoMarques = histoMarques
    netat.synchronise = false
    return Immutable.fromJS(netat)
  }
  actions[typesEvenement.MAJ_RENCONTRE] = function () {
    console.debug(`| Mise à jour: ${JSON.stringify(action.rencontre)}`)
    const netat = {...etat}
    netat.rencontre = action.rencontre      
    netat.modeEdition = false
    return Immutable.fromJS(netat)
  }
  actions[typesEvenement.CHANGEMENT_PERIODE] = function () {
    console.debug(`| Nouvelle période: ${JSON.stringify(action.periode)}`)
    const netat = {...etat}
    netat.rencontre.periode = action.periode
    return Immutable.fromJS(netat)
  }
  actions[typesEvenement.NOUVEAU_COMMENTAIRE] = function () {
    console.debug(`| Nouveau commentaire sur la rencontre: ${action.commentaire}`)
    let nouvelEtat = Immutable.fromJS(etat)
    console.debug(`| **************** etat : ${nouvelEtat}`)
    let rencontre = nouvelEtat.get("rencontre")
    if (!rencontre) 
      return nouvelEtat
    console.debug(`| ****rencontre: ${rencontre}`)
    let commentaires = rencontre
      .get("commentaires", Immutable.List())
      .push(action.commentaire)
    console.debug(`| ****commentaires: ${commentaires}`)
    rencontre = rencontre.set("commentaires", commentaires)
    console.debug(`| ****rencontre: ${rencontre}`)
    return Immutable
      .fromJS(etat)
      .set("rencontre", rencontre)
  }
  let etatNouveau = (actions[action.type] || actions['DEFAUT'])();
  console.debug("/----- Nouvel état ----------------")
  console.debug(`${JSON.stringify(etatNouveau.deleteIn(['rencontre', 'histoMarques']).toJS())}`)
  console.debug(">----------------------------------")
  return etatNouveau.toJS()
}

export {reducteur, types}