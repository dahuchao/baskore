import React from "react"
import ballon from "./ballon.png"

export default props => {
  const style = {
    cursor: props.modeVerrouille ? "default" : "pointer",
  }
  return (
    <div className="equipe">
      <div className="nom">{props.nom}</div>
      {
        props.modeVerrouille
          ? <img style={style} className="blason verrouille" src={ballon} alt="" ></img>
          : <img style={style} className="blason" src={ballon} onClick={props.surPanier} alt="" ></img>
      }
    </div >
  )
}
