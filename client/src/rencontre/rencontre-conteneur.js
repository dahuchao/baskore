import React from "react"
import typesCommande from "../types-commande"
import {action$, etat$} from "./rencontre-flux"
import "./rencontre-socket"
import Rencontre from "./rencontre"

let scEtats
export default class RencontreConteneur extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modeEdition: false,
      modeVerrouille: true
    }
  }
  componentDidMount() {
    scEtats = etat$.subscribe(etat => this.setState(etat))
    const idRencontre = this.props.match.params.idRencontre
    action$.next({type: typesCommande.LIRE_RENCONTRE, idRencontre})
  }
  componentWillUnmount() {
    scEtats.unsubscribe()
  }
  render() {
    // console.debug(`Nouvelle rencontre: ` + JSON.stringify(this.state))
    return this.state.rencontre
      ? <Rencontre
          rencontre={this.state.rencontre}
          modeEdition={this.state.modeEdition}
          modeHistogramme={this.state.modeHistogramme}
          modeVerrouille={this.state.modeVerrouille}
          synchronise={this.state.synchronise}/>
      : <p>Chargement de la rencontre...</p>
  }
}
