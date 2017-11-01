import React from "react"
import Immutable from "immutable"
import {Card, TextField, List, ListItem, FlatButton} from "material-ui"
import Done from "material-ui/svg-icons/action/done"
import {action$} from "./rencontre-flux"
import typesCommande from "../types-commande"

export default class Commentaires extends React.Component {
  componentWillMount() {
    this.setState({commentaire: ""})
  }
  saisieCommentaire(e) {
    // console.debug("saisieCommentaire: " + e.target.value)
    this.setState({commentaire: e.target.value})
  }
  surNouveauCommentaire() {
    // console.debug("Commentaire: " + this.state.commentaire)
    this.setState({commentaire: ""})
    const commentaire = this.state.commentaire
    const idRencontre = this.props.rencontre.id
    action$.next({type: typesCommande.ENREGISTRER_COMMENTAIRE, idRencontre, commentaire})
  }
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
        onChange={(e) => this.saisieCommentaire(e)}/>
      <FlatButton onClick={() => this.surNouveauCommentaire()} icon={< Done />}/>
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
}
