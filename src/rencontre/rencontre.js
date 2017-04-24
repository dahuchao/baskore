import React from "react"
import Immutable from "immutable"
import { Link } from 'react-router'
import {
  AppBar,
  Card,
  IconButton,
  Toggle,
  CardText,
  IconMenu,
  MenuItem,
  TimePicker,
  TextField,
  DatePicker
} from "material-ui"
import NavigationArrowBack from "material-ui/svg-icons/navigation/arrow-back"
import ModeEdit from "material-ui/svg-icons/editor/mode-edit"
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Tableau from "./tableau"
import Commentaires from "./commentaires"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Rencontre = React.createClass({
  getInitialState() {
    let rencontre = this.props.rencontre
    rencontre.date = rencontre.date ? rencontre.date : new Date()
    return rencontre
  },
  majDate(x, date) {
    // console.debug("majDate(x, date) " + JSON.stringify(date))
    let dateState = new Date(this.props.rencontre.date)
    dateState.setDate(date.getDate())
    dateState.setMonth(date.getMonth())
    dateState.setFullYear(date.getFullYear())
    this.state.date = dateState;
  },
  majHeure(x, heure) {
    let dateState = new Date(this.props.rencontre.date)
    dateState.setHours(heure.getHours())
    dateState.setMinutes(heure.getMinutes())
    this.state.date = dateState;
  },
  majHote(e) {
    // this.setState({ hote: e.target.value })
    this.state.hote.nom = e.target.value
    // console.debug("MAJ Hote: " + JSON.stringify(this.state))
  },
  majVisiteur(e) {
    // this.setState({ visiteur: e.target.value })
    this.state.visiteur.nom = e.target.value
    // console.debug("MAJ visiteur: " + JSON.stringify(this.state))
  },
  sauver() {
    console.debug(`Rencontre.sauver(${JSON.stringify(this.state)})).`)
    this.props.sauver(this.state) 
  },
  render() {
    let resultat = [{marqueHote:1,marqueVisiteur:0},{marqueHote:2,marqueVisiteur:0},{marqueHote:2,marqueVisiteur:1},{marqueHote:2,marqueVisiteur:2},{marqueHote:2,marqueVisiteur:3},{marqueHote:2,marqueVisiteur:4},{marqueHote:2,marqueVisiteur:5},{marqueHote:2,marqueVisiteur:6},{marqueHote:3,marqueVisiteur:6},{marqueHote:4,marqueVisiteur:6},{marqueHote:4,marqueVisiteur:7},{marqueHote:4,marqueVisiteur:8},{marqueHote:4,marqueVisiteur:9},{marqueHote:4,marqueVisiteur:10},{marqueHote:5,marqueVisiteur:10},{marqueHote:6,marqueVisiteur:10},{marqueHote:6,marqueVisiteur:11},{marqueHote:6,marqueVisiteur:12},{marqueHote:7,marqueVisiteur:12},{marqueHote:8,marqueVisiteur:12},{marqueHote:8,marqueVisiteur:13},{marqueHote:8,marqueVisiteur:14},{marqueHote:9,marqueVisiteur:14},{marqueHote:10,marqueVisiteur:14},{marqueHote:10,marqueVisiteur:15},{marqueHote:10,marqueVisiteur:16},{marqueHote:10,marqueVisiteur:17},{marqueHote:10,marqueVisiteur:18},{marqueHote:11,marqueVisiteur:18},{marqueHote:11,marqueVisiteur:19},{marqueHote:11,marqueVisiteur:20},{marqueHote:11,marqueVisiteur:21},{marqueHote:11,marqueVisiteur:22},{marqueHote:11,marqueVisiteur:23},{marqueHote:12,marqueVisiteur:23},{marqueHote:13,marqueVisiteur:23},{marqueHote:13,marqueVisiteur:24},{marqueHote:13,marqueVisiteur:25},{marqueHote:14,marqueVisiteur:25},{marqueHote:15,marqueVisiteur:25},{marqueHote:15,marqueVisiteur:26},{marqueHote:15,marqueVisiteur:27},{marqueHote:16,marqueVisiteur:27},{marqueHote:17,marqueVisiteur:27},{marqueHote:17,marqueVisiteur:28},{marqueHote:17,marqueVisiteur:29},{marqueHote:18,marqueVisiteur:29},{marqueHote:19,marqueVisiteur:29},{marqueHote:19,marqueVisiteur:30},{marqueHote:19,marqueVisiteur:31},{marqueHote:20,marqueVisiteur:31},{marqueHote:21,marqueVisiteur:31},{marqueHote:22,marqueVisiteur:31},{marqueHote:22,marqueVisiteur:32},{marqueHote:22,marqueVisiteur:33},{marqueHote:23,marqueVisiteur:33},{marqueHote:24,marqueVisiteur:33},{marqueHote:25,marqueVisiteur:33},{marqueHote:25,marqueVisiteur:34},{marqueHote:25,marqueVisiteur:35},{marqueHote:26,marqueVisiteur:35},{marqueHote:27,marqueVisiteur:35},{marqueHote:28,marqueVisiteur:35},{marqueHote:29,marqueVisiteur:35},{marqueHote:30,marqueVisiteur:35},{marqueHote:31,marqueVisiteur:35},{marqueHote:31,marqueVisiteur:36},{marqueHote:31,marqueVisiteur:37},{marqueHote:32,marqueVisiteur:37},{marqueHote:33,marqueVisiteur:37},{marqueHote:33,marqueVisiteur:38},{marqueHote:33,marqueVisiteur:39},{marqueHote:34,marqueVisiteur:39},{marqueHote:35,marqueVisiteur:39},{marqueHote:36,marqueVisiteur:39},{marqueHote:36,marqueVisiteur:40},{marqueHote:36,marqueVisiteur:41},{marqueHote:37,marqueVisiteur:41},{marqueHote:38,marqueVisiteur:41},{marqueHote:38,marqueVisiteur:42},{marqueHote:38,marqueVisiteur:43},{marqueHote:39,marqueVisiteur:43},{marqueHote:40,marqueVisiteur:43},{marqueHote:41,marqueVisiteur:43},{marqueHote:42,marqueVisiteur:43},{marqueHote:42,marqueVisiteur:44},{marqueHote:42,marqueVisiteur:45},{marqueHote:43,marqueVisiteur:45},{marqueHote:44,marqueVisiteur:45},{marqueHote:44,marqueVisiteur:46},{marqueHote:44,marqueVisiteur:47},{marqueHote:44,marqueVisiteur:48},{marqueHote:45,marqueVisiteur:48},{marqueHote:46,marqueVisiteur:48},{marqueHote:46,marqueVisiteur:49},{marqueHote:46,marqueVisiteur:50},{marqueHote:47,marqueVisiteur:50},{marqueHote:48,marqueVisiteur:50},{marqueHote:49,marqueVisiteur:50},{marqueHote:49,marqueVisiteur:51},{marqueHote:49,marqueVisiteur:52},{marqueHote:50,marqueVisiteur:52},{marqueHote:51,marqueVisiteur:52},{marqueHote:52,marqueVisiteur:52},{marqueHote:53,marqueVisiteur:52},{marqueHote:54,marqueVisiteur:52},{marqueHote:55,marqueVisiteur:52},{marqueHote:56,marqueVisiteur:52},{marqueHote:57,marqueVisiteur:52},{marqueHote:57,marqueVisiteur:53},{marqueHote:57,marqueVisiteur:54},{marqueHote:58,marqueVisiteur:54},{marqueHote:59,marqueVisiteur:54},{marqueHote:59,marqueVisiteur:55},{marqueHote:59,marqueVisiteur:56}];
    resultat = this.props.rencontre.histoMarques;
    // console.debug(`Ouverture rencontre: ` + Immutable.fromJS(this.props.rencontre.histoMarques))
    this.state = this.props.rencontre
    const style = {
      color: "white"
    }
    let labelBouton = this.props.modeEdition ? "Sauver" : "Edition"
    let date = this.props.rencontre.date ? new Date(this.props.rencontre.date) : new Date()
    // console.debug(`test: ${date}`)
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
        <Card>
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
            <Toggle
              defaultToggled={this.props.modeVerrouille} 
              onToggle={this.props.surVerrouillage}
              label="Verrouillé" />
            <Toggle
              defaultToggled={this.props.termine} 
              onToggle={this.props.surTermine}
              label="Terminé" />
          </CardText>
        </Card>
      </div>
    ) : (
      this.props.modeHistogramme ? (
      <div>
        <AppBar
          title="Histogramme rencontre"
          iconElementLeft={
            <IconButton onClick={this.props.historique}>
              <NavigationArrowBack />
            </IconButton>
          }
          />
        <Card>
          <ResponsiveContainer width="90%" height={300}>
            <LineChart data={resultat}
                        margin={{top: 25, right: 0, left: 0, bottom: 15}}>
              <YAxis/>
              <CartesianGrid strokeDasharray="3 3"/>
              <Tooltip/>
              <Legend />
              <Line name="marque équipe hote" type="monotone" dataKey="marqueHote" stroke="#8884d8" activeDot={{r: 8}}/>
              <Line name="marque équipe visiteur" type="monotone" dataKey="marqueVisiteur" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
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
              <IconMenu
                  iconButtonElement={
                    <IconButton><MoreVertIcon /></IconButton>
                  }
                  targetOrigin={{horizontal: 'right', vertical: 'top'}}
                  anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                >
                  <MenuItem 
                    onClick={this.props.editer}
                    primaryText="Edition" 
                  />
                  <MenuItem 
                    onClick={this.props.historique}
                    primaryText="Histogramme" />
              </IconMenu>
            } />
          <Tableau
            rencontre={this.props.rencontre}
            surNouvelleMarque={this.props.surNouvelleMarque}
            surPeriode={this.props.surPeriode}
            surChangementHote={this.props.surChangementHote}
            surChangementVisiteur={this.props.surChangementVisiteur}
            modeVerrouille={this.props.modeVerrouille} />
          <Commentaires
            rencontre={this.props.rencontre}
            surNouveauCommentaire={this.props.surNouveauCommentaire}
            modeVerrouille={this.props.modeVerrouille} />
        </div>
      )
    )
  }
})

export default Rencontre
