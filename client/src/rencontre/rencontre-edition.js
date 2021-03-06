import React from "react"
import {
  AppBar,
  Card,
  IconButton,
  CardText,
  Toggle,
  TimePicker,
  TextField,
  DatePicker
} from "material-ui"
import NavigationArrowBack from "material-ui/svg-icons/navigation/arrow-back"
import {types, action$} from "./rencontre-flux"
import typesCommande from "../types-commande"

const RencontreEdition = (props) => {
  let rencontre = props.rencontre
  let date = rencontre.date ? new Date(rencontre.date) : new Date()
  let majDate = (x, date) => {
    // console.debug("majDate(x, date) " + JSON.stringify(date))
    let dateState = new Date(rencontre.date)
    dateState.setDate(date.getDate())
    dateState.setMonth(date.getMonth())
    dateState.setFullYear(date.getFullYear())
    rencontre.date = dateState;
  };
  let majHeure = (x, heure) => {
    let dateState = new Date(rencontre.date)
    dateState.setHours(heure.getHours())
    dateState.setMinutes(heure.getMinutes())
    rencontre.date = dateState;
  };
  let majHote = (e) => {
    rencontre.hote.nom = e.target.value
  };
  let majVisiteur = (e) => {
    rencontre.visiteur.nom = e.target.value
  };
  return (
    <div>
      <AppBar
        title="Edition rencontre"
        iconElementLeft={
          <IconButton onClick={() => action$.next({type: typesCommande.MAJ_RENCONTRE, rencontre})}>
            <NavigationArrowBack />
          </IconButton>
        }
      />
      <Card>
        <CardText>
          <DatePicker floatingLabelText="Date de la rencontre"
            defaultDate={date}
            onChange={majDate} />
          <TimePicker floatingLabelText="Heure de la rencontre"
            defaultTime={date}
            format="24hr"
            onChange={majHeure} />
          <TextField floatingLabelText="Club Hote"
            defaultValue={rencontre.hote.nom}
            onChange={majHote} /><br />
          <TextField floatingLabelText="Club Visiteur"
            defaultValue={rencontre.visiteur.nom}
            onChange={majVisiteur} />
          <Toggle
            defaultToggled={props.modeVerrouille} 
            onToggle={props.surVerrouillage}
            label="Verrouillé" />
          <Toggle
            defaultToggled={props.termine} 
            onToggle={() => action$.next({type: types.TERMINAISON})}
            label="Terminé" />
        </CardText>
      </Card>
    </div>
  )
}

export default RencontreEdition