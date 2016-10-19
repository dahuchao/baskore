import React from "react"
import {
  Card,
  CardText,
  TextField,
  List,
  ListItem,
  IconBsutton,
  FlatButton,
  TimePicker,
  DatePicker
} from "material-ui"
import Done from "material-ui/svg-icons/action/done"

export default React.createClass({
  nouveauC(e) {
    // console.debug("Commentaire: " + e.target.value)
    this.setState({ commentaire: e.target.value })
  },
  surNouveauCommentaire() {
    // console.debug("Commentaire: " + this.state.commentaire)
    this.props.surNouveauCommentaire(this.state.commentaire)
  },
  render() {
    const styleFlex = { display: "flex" }
    return (
      <Card>
        <div style={styleFlex} >
          <TextField
            hintText="Ajouter un commentaire"
            multiLine={true}
            rowsMax={2}
            fullWidth={true}
            maxLength="140"
            onChange={this.nouveauC}
            />
          <FlatButton onClick={this.surNouveauCommentaire} icon={<Done />} />
        </div>
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
