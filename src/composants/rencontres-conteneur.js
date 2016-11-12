import React from "react"
import {connect} from "react-redux"
import store from "../store"
import * as types from "../actions/actions-types"
import request from "request"
import Rencontres from "./rencontres"
import RencontreAjout from "./rencontres-ajout"

import injectTapEventPlugin from 'react-tap-event-plugin'

const RencontresConteneur = React.createClass({
  componentWillMount() {
    injectTapEventPlugin();

  },
  render() {
    return (<Rencontres
      rencontres={this.props.rencontres}
      supprimeRencontre={this.supprimeRencontre}
      ajouterRencontre={this.ajouterRencontre}/>)
  }
})

const mapStateToProps = function (store) {
  return {rencontres: store.rencontreState.rencontres, rencontre: store.rencontreState.rencontre, modeAjout: store.rencontreState.modeAjout}
}

export default connect(mapStateToProps)(RencontresConteneur);