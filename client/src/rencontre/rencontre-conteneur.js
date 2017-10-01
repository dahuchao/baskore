import React from "react"
import Immutable from "immutable"
import io from "socket.io-client"
import Rencontre from "./rencontre"
import {action$} from "./rencontre-actions"
import typesCommande from "../types-commande"
import Repartiteur from "./rencontre-repartiteur"
let {etat$} = Repartiteur()

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
    this.sousc = etat$.subscribe(etat => {
      // console.debug(`etat$.subscribe(etat =>: ${JSON.stringify(etat)}`)
      this.setState(etat)
    })
    this.souscAction = action$.subscribe(action => {
      console.debug("##############################")
      console.debug("\\ ACTION: " + JSON.stringify(action.type))
      let actions = {
        "DEFAUT": function () {
          console.debug(`| Action par défaut`)
          return null
        }
      }
      actions[typesCommande.PANIER_MARQUE] = () => {
        // console.info("Panier marque: " + JSON.stringify(this.state.rencontre))
        return {
          type: typesCommande.PANIER_MARQUE,
          idRencontre: this.state.rencontre.id,
          marqueHote: this.state.rencontre.hote.marque,
          marqueVisiteur: this.state.rencontre.visiteur.marque
        }
      }
      actions[typesCommande.CHANGER_PERIODE] = () => {
        // console.debug("Nouvelle periode: " + JSON.stringify(periode))
        return {
          type: typesCommande.CHANGER_PERIODE,
          idRencontre: this.state.rencontre.id,
          periode: action.periode
        }
      }
      actions[typesCommande.ENREGISTRER_COMMENTAIRE] = () => {
        // console.debug(`surNouveauCommentaire: ${commentaire}`)
        return {
          type: typesCommande.ENREGISTRER_COMMENTAIRE,
          idRencontre: this.state.rencontre.id,
          "commentaire": action.commentaire
        }
      }
      actions[typesCommande.MAJ_RENCONTRE] = () => {
        // console.debug("sauver(majRencontre): " + JSON.stringify(majRencontre))
        return {
          type: typesCommande.MAJ_RENCONTRE,
          idRencontre: action.rencontre.id,
          idSocket: this.socket.id,
          rencontre: action.rencontre
        }
      }
      let commande = (actions[action.type] || actions['DEFAUT'])();
      if (commande != null) 
        this.socket.emit("commande", commande)
    })

    console.debug(`this.props: ${JSON.stringify(this.props)}`)
    const idRencontre = this.props.match.params.idRencontre
    this
      .socket
      .on("connect", () => {
        // console.info(`Connecté avec la table de marque: ${this.socket.id}`)
        this
          .socket
          .emit("commande", {
            type: typesCommande.LIRE_RENCONTRE,
            idRencontre: idRencontre,
            idSocket: this.socket.id
          })
        this
          .socket
          .on("evenement", evenement => {
            // console.debug("Reception d'un évenement: " + JSON.stringify(evenement))
            action$.next(evenement)
          })
      })
  }
  componentWillUnmount() {
    this
      .sousc
      .unsubscribe()
    this
      .souscAction
      .unsubscribe()
    this
      .socket
      .disconnect()
  }
  surChangementHote(sor, ent) {
    // console.debug(`Changement hote ${sor} par ${ent}`)
    let joueuses = Immutable
      .List(this.state.rencontre.hote.joueuses)
      .map(joueuse => {
        if (joueuse === sor) 
          return ent
        else 
          return joueuse
      })
    this
      .socket
      .emit("commande", {
        type: typesCommande.CHANGER_JOUEUR_HOTE,
        idRencontre: this.state.rencontre.id,
        joueuses: joueuses
      })
  }
  surChangementVisiteur(sor, ent) {
    // console.debug(`Changement visiteur ${sor} par ${ent}`)
    let joueuses = Immutable
      .List(this.state.rencontre.hote.joueuses)
      .map(joueuse => {
        if (joueuse === sor) 
          return ent
        else 
          return joueuse
      })
    this
      .socket
      .emit("commande", {
        type: typesCommande.CHANGER_JOUEUR_VISITEUR,
        idRencontre: this.state.rencontre.id,
        joueuses: joueuses
      })
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
      : null
  }
}
