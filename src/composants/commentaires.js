import React from "react"
import {
  Card,
  CardText,
  TextField,
  List,
  ListItem,
  IconBsutton,
  TimePicker,
  DatePicker
} from "material-ui"
import NavigationArrowBack from "material-ui/svg-icons/navigation/arrow-back"

export default React.createClass({
  nouveauC(e) {
    console.debug("Commentaire: " + e.target.value)
  },
  render() {
    return (
      <Card>
        <TextField
          hintText="Ajouter un commentaire"
          multiLine={true}
          rowsMax={2}
          fullWidth={true}
          maxLength="140"
          onChange={this.nouveauC}
          />
        <List id="commentaires" >
          <ListItem
            primaryText="Morgane entre sur le terrain à la place de Jacqueline" />
          <ListItem
            primaryText="Panier magnifique de Tifanie" />
          <ListItem
            primaryText="Les visiteurs dominent la partie" />
          <ListItem
            primaryText="Dans la raquette les interieurs dominent sans partage" />
          <ListItem
            primaryText="Superbe action des Nantaises qui malheureusement ne donnera rien" />
        </List>
      </Card>
    )
  }
})
