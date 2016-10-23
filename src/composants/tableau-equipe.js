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
        <div style={styleJoueuses}>
          <Joueurr></Joueurr>
          <Joueurr></Joueurr>
          <Joueurr></Joueurr>
          <Joueurr></Joueurr>
        </div>
      </div >
    )
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
        value="4"
        >
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


class Joueurr extends React.Component {
  render() {
    const styleJoueuse = {
      width: "2em",
      borderColor: "white"
    }
    return (
      <select
        className="joueuse"
        name="select">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="13">13</option>
        <option value="14">14</option>
      </select>
    )
  }
}