import React from "react"
import {
  SelectField,
  MenuItem
} from "material-ui"

export default class Equipe extends React.Component {
  render() {
    const styleJoueuses = {
      display: "flex",
      flexDirection: "row",
      borderColor: "red"
    }
    console.debug("Equipe largeur: " + this.props.width)
    return (
      <div className="equipe" onClick={this.props.surPanier}>
        <div className="nom">{this.props.nom}</div>
        <img className="blason" src="img/ballon6.png"></img>
      </div >
    )
  }
}
