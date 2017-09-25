import React from "react"
import Immutable from "immutable"
import { IconMenu, SelectField, MenuItem } from "material-ui"
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
        {/* <div style={styleJoueuses}>{
          this.props.joueuses.map(joueuse => {
            return <Joueuse key={id++} surChangement={this.props.surChangement} numero={joueuse} modeVerrouille={this.props.modeVerrouille}/>
          })
        }
        </div> */}
      </div >
    )
  }
}

class Joueuse extends React.Component {
  surChangement(sor, ent) {
    console.debug(`Changement ${sor} par ${ent}`)
    this.props.surChangement(sor, ent)
  }
  render() {
    // console.debug(`props: ${JSON.stringify(this.props)}` )
    const num = this.props.numero
    const etoile = `/joueuses/joueuse-${num}.png`
    const style = {
      cursor: this.props.modeVerrouille ? "default" : "pointer",
      width: "2em",
      height: "2em",
      maxWidth: "40px",
      maxHeigth: "40px"
    }
    // listStyle={{ backgroundColor: "bleu" }}
    // style={{ backgroundColor: "bleu" }}
    let id = 1
    return (
      <IconMenu
        disabled={this.props.modeVerrouille}
        iconButtonElement={<img alt="marqueur" style={style} src={etoile}></img>} >
        {
          this.props.modeVerrouille ? null : Immutable
            .List
            .of(4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14)
            .map(entrant => {
              return (<MenuItem
                onClick={()=>this.surChangement(num, entrant)}
                key={id++}
                innerDivStyle={{ color: "red", backgroundColor: "bleu", width: "2em" }}
                nestedListStyle={{ backgroundColor: "bleu", width: "2em" }}
                style={{ backgroundColor: "bleu" }}
                value={entrant}
                primaryText={entrant} />)
            })
        }
      </IconMenu>
    )
  }
}

class Etoile extends React.Component {
  render() {
    const num = this.props.numero
    const etoile = `/joueuses/joueuse-${num}.png`
    const style = {
      width: "2em",
      height: "2em"
    }
    return (<img alt="etoile" style={style} src={etoile} />)
  }
}

class Joueur extends React.Component {
  render() {
    const styleJoueuse = {
      width: "2em",
      borderColor: "white"
    }
    return (
      <SelectField
        className="joueuse"
        style={styleJoueuse}
        autoWidth="true"
        value="4">
        <MenuItem value="4" primaryText="4" />
        <MenuItem value="5" primaryText="5" />
        <MenuItem value="6" primaryText="6" />
        <MenuItem value="7" primaryText="7" />
        <MenuItem value="8" primaryText="8" />
        <MenuItem value="9" primaryText="9" />
        <MenuItem value="10" primaryText="10" />
        <MenuItem value="11" primaryText="11" />
        <MenuItem value="12" primaryText="12" />
        <MenuItem value="13" primaryText="13" />
        <MenuItem value="14" primaryText="14" />
      </SelectField>
    )
  }
}