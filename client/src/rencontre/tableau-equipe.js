import React from "react"
import ballon from "./ballon.png"

export default class Equipe extends React.Component {
  render() {
    const style = {
      cursor: this.props.modeVerrouille ? "default" : "pointer",
    }
    return (
      <div className="equipe">
        <div className="nom">{this.props.nom}</div>
        {
          this.props.modeVerrouille
            ? <img style={style} className="blason verrouille" src={ballon} alt="" ></img>
            : <img style={style} className="blason" src={ballon} onClick={this.props.surPanier} alt="" ></img>
        }
      </div >
    )
  }
}
