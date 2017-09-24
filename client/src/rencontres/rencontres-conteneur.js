import React from "react"
import io from "socket.io-client"
import * as types from "./rencontres-actions"
import typesCommande from "../types-commande"
import Rencontres from "./rencontres"
import RencontreAjout from "./ajout/ajout"
import Repartiteur from "./rencontres-repartiteur"
let {etat$, action$} = Repartiteur()

export default class RencontresConteneur extends React.Component {
  constructor(props) {
    super(props);
    const prot = window.location.protocol
    const host = window.location.host
    this.socket = io(`${prot}//${host}`)
    this.state = {
      rencontres: [],
      modeAjout: false
    }
  }
  componentDidMount() {
    this.sousc = etat$.subscribe(etat => this.setState(etat))
    this
      .socket
      .on("connect", () => {
        // console.info("Connecté avec la table de marque")
        this
          .socket
          .emit("commande", {
            type: typesCommande.LIRE_RENCONTRES,
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
      .socket
      .disconnect()
  }
  creerRencontre() {
    console.debug("creer rencontre.")
    action$.next({type: types.CREER_RENCONTRE})
  }
  supprimeRencontre(idRencontre) {
    console.debug("Suppression: " + idRencontre)
    this
      .socket
      .emit("commande", {
        type: typesCommande.SUPPRIMER_RENCONTRE,
        idRencontre: idRencontre,
        idSocket: this.socket.id
      })
  }
  ajoutRencontre(infos) {
    let rencontre = this.state.rencontre
    if (infos == null) {
      action$.next({type: types.ANNULER_RENCONTRE, rencontre: rencontre})
      return
    }
    // console.info("Info: " + JSON.stringify(infos))
    rencontre.date = infos.date
    rencontre.periode = infos.periode
    rencontre.hote.nom = infos.hote
    rencontre.visiteur.nom = infos.visiteur
    console.debug("Ajout rencontre : " + JSON.stringify(rencontre))
    this
      .socket
      .emit("commande", {
        type: typesCommande.AJOUTER_RENCONTRE,
        rencontre: rencontre,
        idSocket: this.socket.id
      })
  }
  render() {
    return (this.state.modeAjout
      ? <RencontreAjout
          rencontre={this.state.rencontre}
          ajoutRencontre={(infos) => this.ajoutRencontre(infos)}/>
      : <Rencontres
          rencontres={this.state.rencontres}
          supprimeRencontre={(idRencontre) => this.supprimeRencontre(idRencontre)}
          creerRencontre={this.creerRencontre}/>)
  }
}
