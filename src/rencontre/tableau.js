import React from "react"
import Marque from "./tableau-marque.js"
import Equipe from "./tableau-equipe.js"

export default React.createClass({
  surPanierHote() {
    // console.info("Panier marque: " +
    // JSON.stringify(this.props.rencontre.hote.marque))
    let marque = this.props.rencontre.hote.marque
    this.props.rencontre.hote.marque = marque + 1
    // this.socket.emit('panierMarque', this.props.rencontre)
    this
      .props
      .surNouvelleMarque()
  },
  surPanierVisiteur() {
    // console.info("Panier marque: " +
    // JSON.stringify(this.props.rencontre.visiteur.marque))
    let marque = this.props.rencontre.visiteur.marque
    this.props.rencontre.visiteur.marque = marque + 1
    // this.socket.emit('panierMarque', this.props.rencontre)
    this
      .props
      .surNouvelleMarque()
  },
  surCorrectionHote() {
    // console.info("Correction de la marque");
    let marque = this.props.rencontre.hote.marque
    this.props.rencontre.hote.marque = marque - 1
    // this.socket.emit('panierMarque', this.props.rencontre)
    this
      .props
      .surNouvelleMarque()
  },
  surCorrectionVisiteur() {
    // console.info("Correction de la marque")
    let marque = this.props.rencontre.visiteur.marque
    this.props.rencontre.visiteur.marque = marque - 1
    // this.socket.emit('panierMarque', this.props.rencontre)
    this
      .props
      .surNouvelleMarque()
  },
  render() {
    // this.ouvertureRencontre(this.props.rencontre.id)
    return this.props.rencontre
      ? <div id="tableau">
          <Equipe
            nom={this.props.rencontre.hote.nom}
            joueuses={this.props.rencontre.hote.joueuses}
            surPanier={this.surPanierHote}
            surChangement={this.props.surChangementHote}
            modeVerrouille={this.props.modeVerrouille}/>
          <Marque
            rencontre={this.props.rencontre}
            surPeriode={this.props.surPeriode}
            surCorrectionHote={this.surCorrectionHote}
            surCorrectionVisiteur={this.surCorrectionVisiteur}
            modeVerrouille={this.props.modeVerrouille}/>
          <Equipe
            nom={this.props.rencontre.visiteur.nom}
            joueuses={this.props.rencontre.visiteur.joueuses}
            surPanier={this.surPanierVisiteur}
            surChangement={this.props.surChangementVisiteur}
            modeVerrouille={this.props.modeVerrouille}/>
        </div>
      : null
  }
})
