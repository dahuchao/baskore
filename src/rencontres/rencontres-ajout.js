import React from "react"
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
import Close from "material-ui/svg-icons/navigation/close"

const RencontreAjout = React.createClass({
  getInitialState() {
    return { date: new Date() }
  },
  majDate(x, date) {
    let dateState = this.state.date
    dateState.setDate(date.getDate())
    dateState.setMonth(date.getMonth())
    dateState.setFullYear(date.getFullYear())
    this.setState({ date: dateState })
    // console.debug("Ajout date: " + JSON.stringify(this.state))
  },
  majHeure(x, heure) {
    let dateState = this.state.date
    dateState.setHours(heure.getHours())
    dateState.setMinutes(heure.getMinutes())
    this.setState({ date: dateState })
    // console.debug("Ajout heure: " + JSON.stringify(this.state))
  },
  majHote(e) {
    this.setState({ hote: e.target.value })
    // console.debug("Ajout hote: " + JSON.stringify(this.state))
  },
  majVisiteur(e) {
    this.setState({ visiteur: e.target.value })
    // console.debug("Ajout visiteur: " + JSON.stringify(this.state))
  },
  sauver() {
    // let date = this.state.date
    // let strdate = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear()
    // this.state.date = strdate
    this.props.ajoutRencontre(this.state)
  },
  annuler() {
    this.props.ajoutRencontre(null)
  },
  render() {
    return (
      <div>
        <AppBar title="Ajouter rencontre"
          iconElementLeft={<IconButton onClick={this.sauver}><NavigationArrowBack /></IconButton>}
          iconElementRight={<IconButton onClick={this.annuler}><Close /></IconButton>}
          />
        <Card>
          <CardText>
            <DatePicker floatingLabelText="Date de la rencontre"
              onChange={this.majDate} />
            <TimePicker floatingLabelText="Heure de la rencontre"
              format="24hr"
              onChange={this.majHeure} />
            <TextField floatingLabelText="Club hote"
              defaultValue={this.props.rencontre.hote.nom}
              onChange={this.majHote} />
            <TextField floatingLabelText="Club visiteur"
              defaultValue={this.props.rencontre.visiteur.nom}
              onChange={this.majVisiteur} />
          </CardText>
        </Card>
      </div>
    )
  }
})

export default RencontreAjout
