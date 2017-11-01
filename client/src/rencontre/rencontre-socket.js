import io from "socket.io-client"
import typesCommande from "../types-commande"
import {action$} from "./rencontre-flux"
import "rxjs/add/operator/map"
import "rxjs/add/operator/filter"

const action2commande = action => {
  console.debug("##############################")
  console.debug("\\ ACTION: " + JSON.stringify(action.type))
  let actions = {
    "DEFAUT": function () {
      console.debug(`| Action par défaut (l'action n'est pas une commande)`)
      return null
    }
  }
  actions[typesCommande.LIRE_RENCONTRE] = () => {
    // console.info("Panier marque: " + JSON.stringify(action))
    return {type: typesCommande.LIRE_RENCONTRE, idRencontre: action.idRencontre}
  }
  actions[typesCommande.PANIER_MARQUE] = () => {
    // console.info("Panier marque: " + JSON.stringify(action.rencontre))
    return {type: typesCommande.PANIER_MARQUE, idRencontre: action.rencontre.idRencontre, marqueHote: action.rencontre.marqueHote, marqueVisiteur: action.rencontre.marqueVisiteur}
  }
  actions[typesCommande.CHANGER_PERIODE] = () => {
    // console.debug("Nouvelle periode: " + JSON.stringify(periode))
    return {type: typesCommande.CHANGER_PERIODE, idRencontre: action.idRencontre, periode: action.periode}
  }
  actions[typesCommande.ENREGISTRER_COMMENTAIRE] = () => {
    // console.debug(`surNouveauCommentaire: ${commentaire}`)
    return {type: typesCommande.ENREGISTRER_COMMENTAIRE, idRencontre: action.idRencontre, "commentaire": action.commentaire}
  }
  actions[typesCommande.MAJ_RENCONTRE] = () => {
    // console.debug("sauver(majRencontre): " + JSON.stringify(majRencontre))
    return {type: typesCommande.MAJ_RENCONTRE, idRencontre: action.rencontre.id, rencontre: action.rencontre}
  }
  return (actions[action.type] || actions['DEFAUT'])();
}

const commande$ = action$
  .map(action2commande)
  .filter(commande => commande != null)

const prot = window.location.protocol
const host = window.location.host
let socket = io(`${prot}//${host}`)

socket.on("connect", () => {
  // console.info(`Connecté avec la table de marque: ${this.socket.id}`)
  commande$.subscribe(commande => {
    commande.idSocket = socket.id
    socket.emit("commande", commande)
  })
  socket.on("evenement", evenement => {
    // console.debug("Reception d'un évenement: " + JSON.stringify(evenement))
    action$.next(evenement)
  })
})
