import React from "react"
import Immutable from "immutable"
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
    console.debug(`Commentaires: ` + Immutable.List(this.props.rencontre.commentaires).toJS())
    let id = 0
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
          {
            Immutable.List(this.props.rencontre.commentaires).reverse().map(commentaire => {
              return (
                <ListItem
                  key={id++}
                  primaryText={commentaire}
                  />
              )
            })
          }
        </List>
      </Card>
    )
  }
})
