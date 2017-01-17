import React from "react"
import Rx from 'rxjs'
import Immutable from "immutable"
import io from "socket.io-client"
import request from "request"
import * as types from "./rencontres-actions"
import typesCommande from "../types-commande"
import Rencontres from "./rencontres"
import RencontreAjout from "./rencontres-ajout"
import Repartiteur from "./rencontres-repartiteur"
let {etat$, action$} = Repartiteur()

export default class RencontresConteneur extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rencontres: [],
      modeAjout: false
    }
  }
  componentDidMount() {
    etat$.subscribe(etat => this.setState(etat))
    // console.info(`Adresse socket io: ${location.href}`)
    this.socket = io(location.href)
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
  ajouterRencontre() {
    console.log("Ajouter rencontre.")
    action$.next({type: types.AJOUTER_RENCONTRE})
  }
  supprimeRencontre(idRencontre) {
    console.info("Suppression: " + idRencontre)
    var adresse = location.protocol + "//" + location.host + "/api/rencontres/" + idRencontre
    console.info("Requete de l'API web: " + adresse)
    request({
      url: adresse,
      method: "DELETE"
    }, function (error, response) {
      if (!error && response.statusCode == 204) {
        action$.next({type: types.DELETE_RENCONTRE_SUCCESS, idRencontre: idRencontre})
      }
    })
  }
  ajoutRencontre(infos) {
    if (infos == null) {
      action$.next({type: types.ANNULER_RENCONTRE, rencontre: rencontre})
      return
    }
    let rencontre = this.state.rencontre
    console.info("Info: " + JSON.stringify(infos))
    rencontre.date = infos.date
    rencontre.periode = infos.periode
    rencontre.hote.nom = infos.hote
    rencontre.visiteur.nom = infos.visiteur
    console.log("Ajout rencontre : " + JSON.stringify(rencontre))
    var adresse = location.protocol + "//" + location.host + "/api/rencontres"
    console.info("Requete de l'API web: " + adresse)
    request({
      url: adresse,
      method: "POST",
      json: rencontre
    }, function (error, response, rencontres) {
      if (!error && response.statusCode == 201) {
        // Calcul de l'identifiant de la nouvelle rencontre
        let [,
          id] = /^\/api\/rencontres\/(.*)$/.exec(response.headers.location);
        // let id = response.headers.location.replace(new
        // RegExp("/api\/rencontre\/(.*)"), "$1")
        console.info("id: " + id)
        rencontre.id = id
        console.info("Rencontre: " + JSON.stringify(rencontre))
        action$.next({type: types.POST_RENCONTRE_SUCCESS, rencontre: rencontre})
      }
    })
  }
  render() {
    return (this.state.modeAjout
      ? <RencontreAjout
          rencontre={this.state.rencontre}
          ajoutRencontre={this
          .ajoutRencontre
          .bind(this)}/>
      : <Rencontres
        rencontres={this.state.rencontres}
        supprimeRencontre={this.supprimeRencontre}
        ajouterRencontre={this.ajouterRencontre}/>)
  }
}
