import React from "react"
import io from "socket.io-client"
import {action$} from "./rencontres-actions"
import typesCommande from "../types-commande"
import Rencontres from "./rencontres"
import RencontreAjout from "./ajout/ajout"
import Repartiteur from "./rencontres-repartiteur"
let {etat$} = Repartiteur()

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
    this.souscAction = action$.subscribe(action => {
      console.debug("##############################")
      console.debug("\\ ACTION: " + JSON.stringify(action.type))
      let actions = {
        "DEFAUT": function () {
          console.debug(`| Action par défaut`)
        }
      }
      actions[typesCommande.AJOUTER_RENCONTRE] = () => {
        const infos = action.state
        let rencontre = this.state.rencontre
        // console.info("Info: " + JSON.stringify(infos))
        rencontre.date = infos.date
        rencontre.periode = infos.periode
        rencontre.hote.nom = infos.hote
        rencontre.visiteur.nom = infos.visiteur
        console.debug("Ajouter rencontre : " + JSON.stringify(rencontre))
        this
          .socket
          .emit("commande", {
            type: typesCommande.AJOUTER_RENCONTRE,
            rencontre: rencontre,
            idSocket: this.socket.id
          })
      }
      actions[typesCommande.SUPPRIMER_RENCONTRE] = () => {
        console.debug("Supprimer rencontre: " + action.idRencontre)
        this
          .socket
          .emit("commande", {
            type: typesCommande.SUPPRIMER_RENCONTRE,
            idRencontre: action.idRencontre,
            idSocket: this.socket.id
          })
      }
      (actions[action.type] || actions['DEFAUT'])();
    })

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
      .souscAction
      .unsubscribe()
    this
      .socket
      .disconnect()
  }
  // ajoutRencontre(infos) {}
  render() {
    return (this.state.modeAjout
      ? <RencontreAjout rencontre={this.state.rencontre}/>
      : <Rencontres
        rencontres={this.state.rencontres}
        supprimeRencontre={(idRencontre) => this.supprimeRencontre(idRencontre)}/>)
  }
}
