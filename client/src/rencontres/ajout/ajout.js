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
import {etat$, action$, types} from "./repartiteur"

export default class RencontreAjout extends React.Component {
  // constructor(props) {
  //   super(props);
  //   action$.next({type: types.INIT, props})
  // }
  componentDidMount() {
    this.sousc = etat$.subscribe(etat => this.setState(etat))
  }
  componentWillUnmount() {
    this
      .sousc
      .unsubscribe()
  }
  sauver() {
    this
      .props
      .ajoutRencontre(this.state)
  }
  annuler() {
    this
      .props
      .ajoutRencontre(null)
  }
  render() {
    return (
      <div>
        <AppBar
          title="Ajouter rencontre"
          iconElementLeft={< IconButton onClick = {
          () => this.sauver()
        } > <NavigationArrowBack/> < /IconButton>}
          iconElementRight={< IconButton onClick = {
          () => this.annuler()
        } > <Close/> < /IconButton>}/>
        <Card>
          <CardText>
            <DatePicker
              floatingLabelText="Date de la rencontre"
              onChange={(x, date) => action$.next({type: types.NOUV_DATE, date})}/>
            <TimePicker
              floatingLabelText="Heure de la rencontre"
              format="24hr"
              onChange={(x, heure) => action$.next({type: types.NOUV_HEURE, heure})}/>
            <TextField
              floatingLabelText="Club hote"
              defaultValue={this.props.rencontre.hote.nom}
              onChange={e => action$.next({type: types.NOUV_HOTE, hote: e.target.value})}/>
            <TextField
              floatingLabelText="Club visiteur"
              defaultValue={this.props.rencontre.visiteur.nom}
              onChange={e => action$.next({type: types.NOUV_VISITEUR, visiteur: e.target.value})}/>
          </CardText>
        </Card>
      </div>
    )
  }
}
