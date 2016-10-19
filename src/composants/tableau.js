import React from "react"
import Marque from "./tableau-marque.js"
import Equipe from "./tableau-equipe.js"

export default React.createClass({
  surPanierHote: function () {
    // console.info("Panier marque: " + JSON.stringify(this.props.rencontre.hote.marque))
    let marque = this.props.rencontre.hote.marque
    this.props.rencontre.hote.marque = marque + 1
    // this.socket.emit('panierMarque', this.props.rencontre)
    this.props.surNouvelleMarque()
  },
  surPanierVisiteur: function () {
    // console.info("Panier marque: " + JSON.stringify(this.props.rencontre.visiteur.marque))
    let marque = this.props.rencontre.visiteur.marque
    this.props.rencontre.visiteur.marque = marque + 1
    // this.socket.emit('panierMarque', this.props.rencontre)
    this.props.surNouvelleMarque()
  },
  surCorrectionHote: function () {
    // console.info("Correction de la marque");
    let marque = this.props.rencontre.hote.marque
    this.props.rencontre.hote.marque = marque - 1
    // this.socket.emit('panierMarque', this.props.rencontre)
    this.props.surNouvelleMarque()
  },
  surCorrectionVisiteur: function () {
    // console.info("Correction de la marque")
    let marque = this.props.rencontre.visiteur.marque
    this.props.rencontre.visiteur.marque = marque - 1
    // this.socket.emit('panierMarque', this.props.rencontre)
    this.props.surNouvelleMarque()
  },
  render: function () {
    // console.debug("Conteneur3.")
    // this.ouvertureRencontre(this.props.rencontre.id)
    return (
      <div id="tableau">
        <Equipe
          nom={this.props.rencontre.hote.nom}
          surPanier={this.surPanierHote} />
        <Marque
          rencontre={this.props.rencontre}
          surPeriode={this.props.surPeriode}
          surCorrectionHote={this.surCorrectionHote}
          surCorrectionVisiteur={this.surCorrectionVisiteur} />
        <Equipe
          nom={this.props.rencontre.visiteur.nom}
          surPanier={this.surPanierVisiteur} />
      </div>
    )
  }
})

