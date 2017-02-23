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
  componentWillMount() {
    this.setState({commentaire: ""})
  },
  saisieCommentaire(e) {
    // console.debug("saisieCommentaire: " + e.target.value)
    this.setState({commentaire: e.target.value})
    // console.debug(`saisieCommentaire: ` + this.state.commentaire)
  },
  surNouveauCommentaire() {
    // console.debug("Commentaire: " + this.state.commentaire)
    this
      .props
      .surNouveauCommentaire(this.state.commentaire)
    this.setState({commentaire: ""})
    // console.debug(`surNouveauCommentaire: ` +this.state.commentaire)
  },
  render() {
    // console.debug(`Render: ` +this.state.commentaire)
    let id = 0
    const styleFlex = {
      display: "flex"
    }
    const styleElement = {
      fontSize: "0.8rem",
      paddingLeft: "0.8rem",
      paddingRight: "0.8rem",
      paddingTop: "0.3rem",
      paddingBottom: "0.3rem"
    }
    const styleCommentaire = {
      cursor: "default"
    }
    let commentaires = Immutable
      .List(this.props.rencontre.commentaires)
      .reverse()
      .map(commentaire => {
        const element = (<ListItem
          key={id++}
          style={styleCommentaire}
          primaryText={commentaire}
          innerDivStyle={styleElement}/>)
        return element
      })
    let champSaisie = <div style={styleFlex}>
      <TextField
        hintText="Ajouter un commentaire"
        multiLine={true}
        rowsMax={2}
        fullWidth={true}
        maxLength="140"
        value={this.state.commentaire}
        onChange={this.saisieCommentaire}/>
      <FlatButton onClick={this.surNouveauCommentaire} icon={< Done />}/>
    </div>
    return (
      <Card>
        {this.props.modeVerrouille
          ? null
          : champSaisie}
        <List style={{
          padding: "0px"
        }}>
          {commentaires}
        </List>
      </Card>
    )
  }
})
