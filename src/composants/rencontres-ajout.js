import React from "react"
import {
  AppBar,
  Card,
  IconButton,
  FlatButton,
  RaisedButton,
  ContentAdd,
  CardText,
  TimePicker,
  TextField,
  DatePicker
} from "material-ui"
import NavigationArrowBack from "material-ui/svg-icons/navigation/arrow-back"

const RencontreAjout = React.createClass({
  getInitialState: function () {
    let rencontre = this.props.rencontre
    return { date: new Date(), periode: 1, hote: rencontre.hote.nom, visiteur: rencontre.visiteur.nom }
  },
  majDate: function (x, date) {
    let dateState = this.state.date
    dateState.setDate(date.getDate())
    dateState.setMonth(date.getMonth())
    dateState.setFullYear(date.getFullYear())
    this.setState({ date: dateState })
    console.debug("Ajout date: " + JSON.stringify(this.state))
  },
  majHeure: function (x, heure) {
    let dateState = this.state.date
    dateState.setHours(heure.getHours())
    dateState.setMinutes(heure.getMinutes())
    this.setState({ date: dateState })
    console.debug("Ajout heure: " + JSON.stringify(this.state))
  },
  majHote: function (e) {
    this.setState({ hote: e.target.value })
    console.debug("Ajout hote: " + JSON.stringify(this.state))
  },
  majVisiteur: function (e) {
    this.setState({ visiteur: e.target.value })
    console.debug("Ajout visiteur: " + JSON.stringify(this.state))
  },
  sauver: function () {
    // let date = this.state.date
    // let strdate = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear()
    // this.state.date = strdate
    this.props.ajoutRencontre(this.state)
  },
  render: function () {
    return (
      <div>
        <AppBar title="Ajouter rencontre"
          iconElementLeft={<IconButton onClick={this.sauver}><NavigationArrowBack /></IconButton>} />
        <Card>
          <CardText>
            <DatePicker hintText="Date de la rencontre"
              onChange={this.majDate} />
            <TimePicker hintText="Heure de la rencontre"
              format="24hr"
              onChange={this.majHeure} />
            <TextField hintText="Club Hote"
              defaultValue={this.props.rencontre.hote.nom}
              onChange={this.majHote} /><br />
            <TextField hintText="Club Visiteur"
              defaultValue={this.props.rencontre.visiteur.nom}
              onChange={this.majVisiteur} /><br />
          </CardText>
        </Card>
      </div>
    )
  }
})

export default RencontreAjout
