import React from "react"
import { Link } from 'react-router'
import {
  AppBar,
  Card,
  IconButton,
  CardText,
  TimePicker,
  TextField,
  DatePicker
} from "material-ui"
import NavigationArrowBack from "material-ui/svg-icons/navigation/arrow-back"
import ModeEdit from "material-ui/svg-icons/editor/mode-edit"
import Tableau from "./tableau"

const Rencontre = React.createClass({
  getInitialState() {
    let rencontre = this.props.rencontre
    let date = rencontre.date ? rencontre.date : new Date()
    return { date: date, hote: rencontre.hote.nom, visiteur: rencontre.visiteur.nom }
  },
  majDate(x, date) {
    let dateState = this.state.date
    dateState.setDate(date.getDate())
    dateState.setMonth(date.getMonth())
    dateState.setFullYear(date.getFullYear())
    this.setState({ date: dateState })
    console.debug("MAJ date: " + JSON.stringify(this.state))
  },
  majHeure(x, heure) {
    let dateState = new Date(this.props.rencontre.date)
    dateState.setHours(heure.getHours() + 2)
    dateState.setMinutes(heure.getMinutes())
    this.setState({ date: dateState })
    console.debug("MAJ heure: " + JSON.stringify(dateState))
  },
  majHote(e) {
    this.setState({ hote: e.target.value })
    // console.debug("MAJ Hote: " + JSON.stringify(this.state))
  },
  majVisiteur(e) {
    this.setState({ visiteur: e.target.value })
    // console.debug("MAJ visiteur: " + JSON.stringify(this.state))
  },
  sauver() {
    console.debug(`Rencontre(sauver).`)
    this.props.sauver(this.state)
  },
  render() {
    const style = {
      color: "white"
    }
    let labelBouton = this.props.modeEdition ? "Sauver" : "Edition"
    let date = this.props.rencontre.date ? new Date(this.props.rencontre.date) : new Date()
    console.debug(`test: ${date}`)
    return this.props.modeEdition ? (
      <div>
        <AppBar
          title="Edition rencontre"
          iconElementLeft={
            <IconButton onClick={this.sauver}>
              <NavigationArrowBack />
            </IconButton>
          }
          />
        <Card >
          <CardText>
            <DatePicker floatingLabelText="Date de la rencontre"
              defaultDate={date}
              onChange={this.majDate} />
            <TimePicker floatingLabelText="Heure de la rencontre"
              defaultTime={date}
              format="24hr"
              onChange={this.majHeure} />
            <TextField floatingLabelText="Club Hote"
              defaultValue={this.props.rencontre.hote.nom}
              onChange={this.majHote} /><br />
            <TextField floatingLabelText="Club Visiteur"
              defaultValue={this.props.rencontre.visiteur.nom}
              onChange={this.majVisiteur} />
          </CardText>
        </Card >
      </div>
    ) : (
        <div>
          <AppBar title="Rencontre"
            iconElementLeft={
              <Link to="/rencontres">
                <IconButton
                  iconStyle={style}>
                  <NavigationArrowBack />
                </IconButton>
              </Link>}
            iconElementRight={
              <IconButton
                onClick={this.props.editer}
                iconStyle={style}>
                <ModeEdit />
              </IconButton>
            } />
          <Tableau
            rencontre={this.props.rencontre}
            surNouvelleMarque={this.props.surNouvelleMarque}
            surPeriode={this.props.surPeriode} />
        </div>
      )
  }
})

export default Rencontre
