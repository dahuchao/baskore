import React from "react"
import {FlatButton} from "material-ui"
import { action$} from "./rencontre-flux"
import typesCommande from "../types-commande"

export default props => {
    const color = props.synchronise ? "black" : "red"
    const style = {
      color: color,
      minWidth: "2em",
      height: "1.5em"
    }
    const styleLabel = {
      fontSize: "1.3em",
      paddingLeft: "0",
      paddingRight: "0"
    }
    const stylePeriode = {
      cursor: props.modeVerrouille
        ? "default"
        : "pointer",
      minWidth: "0",
      lineHeight: "1.3em",
      height: "1.3em"
    }
    const idRencontre = props.rencontre.id
    // console.debug(`Rencontre: ${JSON.stringify(props.rencontre)}`)
    return (
      <div id="marque">
        <div id="periodes">{
          [1, 2, 3, 4].map(periode => {
            let styleLabelPeriode = {
              fontSize: "1em",
              paddingLeft: "0.5em",
              paddingRight: "0.5em"
            }
            periode === props.rencontre.periode
              ? styleLabelPeriode.color = "red"
              : styleLabelPeriode.color = "white"
            return props.modeVerrouille
              ? <FlatButton
                  className="periode"
                  style={stylePeriode}
                  labelStyle={styleLabelPeriode}
                  key={periode}
                  label={"P" + periode}
                />
              : <FlatButton
                  className="periode"
                  style={stylePeriode}
                  labelStyle={styleLabelPeriode}
                  key={periode}
                  label={"P" + periode}
                  onClick={() => action$.next({type: typesCommande.CHANGER_PERIODE, idRencontre, periode})}
                />
          })
        }
        </div>
        <div id="compteurs">
          <FlatButton
            className="hote"
            style={style}
            labelStyle={styleLabel}
            disabled={props.modeVerrouille}
            onClick={props.surCorrectionHote}
            label={props.rencontre.hote.marque.toString()}/>
          <FlatButton
            className="visiteur"
            style={style}
            labelStyle={styleLabel}
            disabled={props.modeVerrouille}
            onClick={props.surCorrectionVisiteur}
            label={props.rencontre.visiteur.marque.toString()}/>
        </div>
        {
          props.rencontre.termine
            ? <p id="termine">Terminé</p>
            : null
        }
      </div>
    )
  }
