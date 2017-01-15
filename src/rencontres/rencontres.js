import React from "react"
import { Link } from "react-router"
import {
  AppBar,
  Card,
  IconButton,
  List,
  ListItem,
  FloatingActionButton,
  TextField,
  DatePicker
} from "material-ui"
import ActionInfo from "material-ui/svg-icons/action/info"
import FileFolder from "material-ui/svg-icons/file/folder"
import ContentAdd from "material-ui/svg-icons/content/add"
import ActionDelete from "material-ui/svg-icons/action/delete"

const Rencontres = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },
  preparationDate(date) {
    let dateRencontre = new Date(date)
    // console.debug(`date Rencontres: ${JSON.stringify(dateRencontre)}`)
    let jour = new Date()
    let strdate = !dateRencontre ?
      "date à préciser" :
      dateRencontre < jour ?
        `${dateRencontre.toLocaleDateString()}` :
        `${dateRencontre.toLocaleDateString()} ${dateRencontre.getHours()}:${dateRencontre.getMinutes()}`
      // console.debug(`date Rencontres: ${JSON.stringify(strdate)}`)
    return strdate
  },
  zoom(idRencontre) {
    // console.debug(`Ouverture de la rencontre: ${idRencontre}`)
    this.context.router.push(`/rencontres/${idRencontre}`)
  },
  render() {
    const poubelle = {
      style: {
        width: 72,
        height: 72,
        padding: 20,
        top: 0,
        right: 0
      },
      icon: {
        width: 36,
        height: 36,
        color: "rgb(0, 188, 212)"
      }
    }
    const style = {
      marginRight: 20
    }
    const styleRencontre = {
      textDecoration: 'none'
    }
    return (
      <div>
        <AppBar title="BASKORE"
          onClick={this.props.listerRencontres}
          iconClassNameRight="muidocs-icon-navigation-expand-more">
          <div className="flottant">
            <FloatingActionButton style={style}
              onMouseDown={this.props.ajouterRencontre}
              >
              <ContentAdd />
            </FloatingActionButton>
          </div>
        </AppBar>
        <Card>
          <List id="rencontres" >
            {this.props.rencontres.map(rencontre => {
              let strDate = this.preparationDate(rencontre.date)
              return (
                <ListItem
                  key={rencontre.id}
                  primaryText={rencontre.hote.nom + '-' + rencontre.visiteur.nom}
                  secondaryText={strDate}
                  onTouchTap={this.zoom.bind(this, rencontre.id)}
                  rightIconButton={
                    <IconButton
                      style={poubelle.style}
                      iconStyle={poubelle.icon}
                      onClick={this.props.supprimeRencontre.bind(null, rencontre.id)}
                      >
                      <ActionDelete />
                    </IconButton>}
                  >
                  <Link to={"/rencontres/" + rencontre.id} />
                </ListItem>
              )
            })}
          </List>
        </Card>
      </div>
    )
  }
})
export default Rencontres;
