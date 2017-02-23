import React from "react"
import Rx from 'rxjs'
import Immutable from "immutable"
import io from "socket.io-client"
import * as types from "./rencontres-actions"
import typesCommande from "../types-commande"
import Rencontres from "./rencontres"
import RencontreAjout from "./rencontres-ajout"
import Repartiteur from "./rencontres-repartiteur"
let {etat$, action$} = Repartiteur()

export default class RencontresConteneur extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io(location.href)
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
    console.log("creer rencontre.")
    action$.next({type: types.CREER_RENCONTRE})
  }
  supprimeRencontre(idRencontre) {
    console.info("Suppression: " + idRencontre)
    this
      .socket
      .emit("commande", {
        type: typesCommande.SUPPRIMER_RENCONTRE,
        idRencontre: idRencontre,
        idSocket: this.socket.id
      })
  }
  ajoutRencontre(infos) {
    if (infos == null) {
      action$.next({type: types.ANNULER_RENCONTRE, rencontre: rencontre})
      return
    }
    let rencontre = this.state.rencontre
    // console.info("Info: " + JSON.stringify(infos))
    rencontre.date = infos.date
    rencontre.periode = infos.periode
    rencontre.hote.nom = infos.hote
    rencontre.visiteur.nom = infos.visiteur
    // console.log("Ajout rencontre : " + JSON.stringify(rencontre))
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
