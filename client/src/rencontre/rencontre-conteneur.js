import React from "react"
import io from "socket.io-client"
import Rencontre from "./rencontre"
import {action$} from "./rencontre-actions"
import typesCommande from "../types-commande"
import Repartiteur from "./rencontre-repartiteur"
let {etat$} = Repartiteur()

const commande$ = action$.map(action => {
  console.debug("##############################")
  console.debug("\\ ACTION: " + JSON.stringify(action.type))
  let actions = {
    "DEFAUT": function () {
      console.debug(`| Action par défaut`)
      return null
    }
  }
  actions[typesCommande.LIRE_RENCONTRE] = () => {
    // console.info("Panier marque: " + JSON.stringify(action))
    return {
      type: typesCommande.LIRE_RENCONTRE,
      idRencontre: action.idRencontre
    }
  }
  actions[typesCommande.PANIER_MARQUE] = () => {
    // console.info("Panier marque: " + JSON.stringify(action.rencontre))
    return {
      type: typesCommande.PANIER_MARQUE,
      idRencontre: action.rencontre.idRencontre,
      marqueHote: action.rencontre.marqueHote,
      marqueVisiteur: action.rencontre.marqueVisiteur
    }
  }
  actions[typesCommande.CHANGER_PERIODE] = () => {
    // console.debug("Nouvelle periode: " + JSON.stringify(periode))
    return {
      type: typesCommande.CHANGER_PERIODE,
      idRencontre: action.idRencontre,
      periode: action.periode
    }
  }
  actions[typesCommande.ENREGISTRER_COMMENTAIRE] = () => {
    // console.debug(`surNouveauCommentaire: ${commentaire}`)
    return {
      type: typesCommande.ENREGISTRER_COMMENTAIRE,
      idRencontre: action.idRencontre,
      "commentaire": action.commentaire
    }
  }
  actions[typesCommande.MAJ_RENCONTRE] = () => {
    // console.debug("sauver(majRencontre): " + JSON.stringify(majRencontre))
    return {
      type: typesCommande.MAJ_RENCONTRE,
      idRencontre: action.rencontre.id,
      rencontre: action.rencontre
    }
  }
  return (actions[action.type] || actions['DEFAUT'])();
}).filter(commande => commande!=null)

export default class RencontreConteneur extends React.Component {
  constructor(props) {
    super(props);
    const prot = window.location.protocol
    const host = window.location.host
    this.socket = io(`${prot}//${host}`)
    this.state = {
      modeEdition: false,
      modeVerrouille: true
    }
  }
  componentDidMount() {
    this.sousc = etat$.subscribe(etat =>this.setState(etat))
    this
      .socket
      .on("connect", () => {
        let socket = this.socket
        // console.info(`Connecté avec la table de marque: ${this.socket.id}`)
        let souscCommandes = commande$.subscribe(commande => {
          commande.idSocket = socket.id
          this.socket.emit("commande", commande)
        })
        socket.souscCommandes = souscCommandes
        this
          .socket
          .on("evenement", evenement => {
            // console.debug("Reception d'un évenement: " + JSON.stringify(evenement))
            action$.next(evenement)
          })
      })
    console.debug(`this.props: ${JSON.stringify(this.props)}`)
    const idRencontre = this.props.match.params.idRencontre
    action$.next({
      type: typesCommande.LIRE_RENCONTRE,
      idRencontre
    })
  }
  componentWillUnmount() {
    this
      .sousc
      .unsubscribe()
    if (this.socket.souscCommandes != null)
      this
        .socket
        .souscCommandes
        .unsubscribe()
    this
      .socket
      .disconnect()
  }
  render() {
    // console.debug(`Nouvelle rencontre: ` + JSON.stringify(this.state))
    return this.state.rencontre
      ? <Rencontre
          rencontre={this.state.rencontre}
          modeEdition={this.state.modeEdition}
          modeHistogramme={this.state.modeHistogramme}
          modeVerrouille={this.state.modeVerrouille}
        />
      : <p>"null"</p>
  }
}
