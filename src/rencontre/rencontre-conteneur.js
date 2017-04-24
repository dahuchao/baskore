import React from "react"
import Rx from 'rxjs'
import Immutable from "immutable"
import io from "socket.io-client"
import Rencontre from "./rencontre"
import * as types from "./rencontre-actions"
import typesCommande from "../types-commande"
import Repartiteur from "./rencontre-repartiteur"
let {etat$, action$} = Repartiteur()

export default class RencontreConteneur extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io(location.href)
    this.state = {
      modeEdition: false,
      modeVerrouille: true
    }
  }
  componentDidMount() {
    this.sousc = etat$.subscribe(etat => {
      // console.info(`etat$.subscribe(etat =>: ${JSON.stringify(etat)}`)
      this.setState(etat)
    })
    const idRencontre = this.props.params.idRencontre
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
      .socket
      .disconnect()
  }
  surNouvelleMarque() {
    // console.info("Panier marque: " + JSON.stringify(this.state.rencontre))
    this
      .socket
      .emit("commande", {
        type: typesCommande.PANIER_MARQUE,
        idRencontre: this.state.rencontre.id,
        marqueHote: this.state.rencontre.hote.marque,
        marqueVisiteur: this.state.rencontre.visiteur.marque
      })
  }
  surNouveauCommentaire(commentaire) {
    // console.debug(`surNouveauCommentaire: ${commentaire}`)
    this
      .socket
      .emit("commande", {
        type: typesCommande.ENREGISTRER_COMMENTAIRE,
        idRencontre: this.state.rencontre.id,
        "commentaire": commentaire
      })
  }
  surChangementHote(sor, ent) {
    // console.debug(`Changement hote ${sor} par ${ent}`)
    let joueuses = Immutable
      .List(this.state.rencontre.hote.joueuses)
      .map(joueuse => {
        if (joueuse == sor) 
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
        if (joueuse == sor) 
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
  surPeriode(periode) {
    // console.debug("Nouvelle periode: " + JSON.stringify(periode))
    this
      .socket
      .emit("commande", {
        type: typesCommande.CHANGER_PERIODE,
        idRencontre: this.state.rencontre.id,
        periode: periode
      })
  }
  sauver(majRencontre) {
    // console.debug("sauver(majRencontre): " + JSON.stringify(majRencontre))
    this
      .socket
      .emit("commande", {
        type: typesCommande.MAJ_RENCONTRE,
        idRencontre: majRencontre.id,
        idSocket: this.socket.id,
        rencontre: majRencontre
      })
  }
  editer() {
    action$.next({type: types.EDITER_RENCONTRE})
  }
  historique() {
    action$.next({type: types.HISTORIQUE_RENCONTRE})
  }
  surVerrouillage() {
    action$.next({type: types.VERROUILLAGE})
  }
  surTermine() {
    action$.next({type: types.TERMINAISON})
  }
  render() {
    // console.debug(`Nouvelle rencontre: ` + JSON.stringify(this.state))
    return this.state.rencontre
      ? <Rencontre
          rencontre={this.state.rencontre}
          surNouvelleMarque={() => this.surNouvelleMarque()}
          editer={() => this.editer()}
          historique={() => this.historique()}
          sauver={(majRencontre) => this.sauver(majRencontre)}
          surNouveauCommentaire={(commentaire) => this.surNouveauCommentaire(commentaire)}
          surChangementHote={(sor, ent) => this.surChangementHote(sor, ent)}
          surChangementVisiteur={(sor, ent) => this.surChangementVisiteur(sor, ent)}
          surPeriode={(periode) => this.surPeriode(periode)}
          modeEdition={this.state.modeEdition}
          modeHistogramme={this.state.modeHistogramme}
          modeVerrouille={this.state.modeVerrouille}
          surVerrouillage={() => this.surVerrouillage()}
          surTermine={() => this.surTermine()}
          />
      : null
  }
}
