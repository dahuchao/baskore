import React from "react"

export default React.createClass({
  render() {
    return (
      <div className="equipe" onClick={this.props.surPanier}>
        <div className="nom">{this.props.nom}</div>
        <img className="blason" src="img/ffbb-blason.png"></img>
      </div>
    )
  }
})
