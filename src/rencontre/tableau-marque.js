import React from "react"
import {
  FlatButton
} from "material-ui"

export default class Marque extends React.Component {
  // surPeriode(periode) {
  //   this.props.surPeriode(periode)
  // }
  render() {
    const style = {
      minWidth: "2em",
      height: "1.5em"
    }
    const styleLabel = {
      fontSize: "1.3em",
      paddingLeft: "0",
      paddingRight: "0"
    }
    const stylePeriode = {
      cursor: this.props.modeVerrouille ? "default" : "pointer",
      minWidth: "0",
      lineHeight: "1.3em",
      height: "1.3em"
    }
    // console.debug("Conteneur4.")
    // console.debug("Rencontre: " + JSON.stringify(this.props.rencontre))
    return (
      <div id="marque">
        <div id="periodes">{
          [1, 2, 3, 4].map(periode => {
            let styleLabelPeriode = {
              fontSize: "1em",
              paddingLeft: "0.5em",
              paddingRight: "0.5em"
            }
            periode == this.props.rencontre.periode ?
              styleLabelPeriode.color = "red" :
              styleLabelPeriode.color = "white"
            // console.log("Couleur: " + JSON.stringify(style))
            return (
              <FlatButton
                className="periode"
                style={stylePeriode}
                labelStyle={styleLabelPeriode}
                key={periode}
                onClick={this.props.modeVerrouille ? null : () => this.props.surPeriode(periode)}
                label={"P" + periode}
                />
            )
          })
        }
        </div>
        <div id="compteurs">
          <FlatButton
            className="hote"
            style={style}
            labelStyle={styleLabel}
            disabled={this.props.modeVerrouille}
            onClick={this.props.surCorrectionHote}
            label={this.props.rencontre.hote.marque.toString()}
            />
          <FlatButton
            className="visiteur"
            style={style}
            labelStyle={styleLabel}
            disabled={this.props.modeVerrouille}
            onClick={this.props.surCorrectionVisiteur}
            label={this.props.rencontre.visiteur.marque.toString()}
            />
        </div>
      </div>
    )
  }
}

