import React from "react"
import Immutable from "immutable"
import { IconMenu, SelectField, MenuItem } from "material-ui"

export default class Equipe extends React.Component {
  render() {
    const styleJoueuses = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      borderColor: "red"
    }
    let id = 1
    const joueuses = Immutable
      .List
      .of(4, 10, 14, 6, 11)
    return (
      <div className="equipe">
        <div className="nom">{this.props.nom}</div>
        {
          this.props.modeVerrouille
            ? <img className="blason" src="img/ballon6.png"></img>
            : <img onClick={this.props.surPanier} className="blason" src="img/ballon6.png"></img>
        }
        <div style={styleJoueuses}>{
          joueuses.map(joueuse => {
            return <Joueuse key={id++} surChangement={this.props.surChangement} numero={joueuse} />
          })
        }
        </div>
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
    const num = this.props.numero
    const etoile = `/joueuses/joueuse-${num}.png`
    const style = {
      width: "2em",
      height: "2em",
      maxWidth: "40px",
      maxHeigth: "40px"
    }
    let id = 1
    return (
      <IconMenu
        // listStyle={{ backgroundColor: "bleu" }}
        // style={{ backgroundColor: "bleu" }}
        disabled={this.props.modeVerrouille}
        iconButtonElement={<img style={style} src={etoile} />} >
        {
          this.props.modeVerrouille ? null : Immutable
            .List
            .of(4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14)
            .map(entrant => {
              return (<MenuItem
                onClick={this
                  .surChangement
                  .bind(this, num, entrant)}
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
    return (<img style={style} src={etoile} />)
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