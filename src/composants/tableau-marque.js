import React from "react"
import store from "../store"
import * as types from "../actions/actions-types"
import {
  FlatButton,
} from "material-ui"

export default React.createClass({
  surPeriode(periode) {
    this.props.surPeriode(periode)
  },
  render() {
    const style = {
      minWidth: "2em",
      height: "1.5em"
    }
    const labelStyle = {
      fontSize: "1.3em",
      paddingLeft: "0",
      paddingRight: "0"
    }
    // console.debug("Conteneur4.")
    console.debug("Rencontre: " + JSON.stringify(this.props.rencontre))
    return (
      <div id="marque">
        <div id="periodes">{
          [1, 2, 3, 4].map(periode => {
            let style = {
              minWidth: "0",
              lineHeight: "1.3em",
              height: "1.3em"
            }
            let labelStyle = {
              fontSize: "1em",
              paddingLeft: "0.5em",
              paddingRight: "0.5em"
            }
            periode == this.props.rencontre.periode ?
              labelStyle.color = "red" :
              labelStyle.color = "white"
            console.log("Couleur: " + JSON.stringify(style))
            return (
              <FlatButton
                className="periode"
                style={style}
                labelStyle={labelStyle}
                key={periode}
                onClick={this.surPeriode.bind(this, periode)}
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
            labelStyle={labelStyle}
            onClick={this.props.surCorrectionHote}
            label={this.props.rencontre.hote.marque.toString()}
            />
          <FlatButton
            className="visiteur"
            style={style}
            labelStyle={labelStyle}
            onClick={this.props.surCorrectionVisiteur}
            label={this.props.rencontre.visiteur.marque.toString()}
            />
        </div>
      </div>
    )
  }
})

