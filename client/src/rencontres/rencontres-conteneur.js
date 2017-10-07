import React from "react"
import io from "socket.io-client"
import {action$} from "./rencontres-actions"
import typesCommande from "../types-commande"
import Rencontres from "./rencontres"
import RencontreAjout from "./ajout/ajout"
import Repartiteur from "./rencontres-repartiteur"
let {etat$} = Repartiteur()

const commande$ = action$.map(action => {
  console.debug("##############################")
  console.debug("\\ ACTION: " + JSON.stringify(action.type))
  let actions = {
    "DEFAUT": function () {
      console.debug(`| Action par défaut`)
    }
  }
  actions[typesCommande.LIRE_RENCONTRES] = () => {
    return {
      type: typesCommande.LIRE_RENCONTRES
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
    return {
      type: typesCommande.AJOUTER_RENCONTRE,
      rencontre: rencontre
    }
  }
  actions[typesCommande.SUPPRIMER_RENCONTRE] = () => {
    console.debug("Supprimer rencontre: " + action.idRencontre)
    return {
      type: typesCommande.SUPPRIMER_RENCONTRE,
      idRencontre: action.idRencontre
    }
  }
  return (actions[action.type] || actions['DEFAUT'])();
}).filter(commande => commande!=null)

let scCmdes
let scEtats

class RencontresSocket{
  constructor(prot, host){
    this.socket = io(`${prot}//${host}`)
  }
  emit(commande){
    this.socket.emit("commande", commande)
  }
  on(callback){
    this
    .socket
    .on("evenement", evenement => callback(evenement))
  }
}

export default class RencontresConteneur extends React.Component {
  constructor(props) {
    super(props);
    const prot = window.location.protocol
    const host = window.location.host
    this.socket = io(`${prot}//${host}`)
    this
      .socket
      .on("connect", () => {
        scCmdes = commande$.map(commande => {
            commande.idSocket = this.socket.id
            return commande
          }).subscribe(commande => this.socket.emit("commande", commande))
        this
          .socket
          .on("evenement", evenement => action$.next(evenement))
      })
    this.state = {
      rencontres: [],
      modeAjout: false
    }
  }
  componentDidMount() {
    scEtats = etat$.subscribe(etat => this.setState(etat))
    action$.next({
      type: typesCommande.LIRE_RENCONTRES
    })
  }
  componentWillUnmount() {
    scEtats.unsubscribe()
    scCmdes.unsubscribe()
    this
      .socket
      .disconnect()
  }
  preparationDate() {
    const jour = new Date()
    return `${jour.toLocaleDateString()} ${jour.getHours()}:${jour.getMinutes()}`
  }
   render() {
    return (
      <div>
        {
          this.state.modeAjout
            ? <RencontreAjout rencontre={this.state.rencontre}/>
            : <Rencontres rencontres={this.state.rencontres}/>
        }
        <footer>
          <div id="info">
            <span className="date">
              {this.preparationDate()}
            </span>
          </div>
        </footer>
      </div>
    )
  }
}
