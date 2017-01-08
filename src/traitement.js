var Rx = require("rxjs")
var Immutable = require("immutable")
var typesCommande = require("./types-commande")
var typesEvenement = require("./types-evenement")

var commande$ = new Rx.BehaviorSubject({type: "DEFAUT"})

var evenement$ = commande$.map(commande => {
  console.log("##############################")
  console.log("\\ COMMANDE: " + JSON.stringify(commande.type))
  let commandes = {
    "DEFAUT": function () {
      return Immutable.fromJS(commande)
    }
  }
  commandes[typesCommande.PANIER_MARQUE] = function () {
    console.log(`| Nouvelle marque ${commande.rencontre.hote.marque}:${commande.rencontre.visiteur.marque}`)
    return Immutable
      .fromJS(commande)
      .set("type", typesEvenement.CHANGEMENT_MARQUE)
  }
  commandes[typesCommande.CHANGER_JOUEUR_HOTE] = function () {
    console.log("| CHANGER_JOUEUR_HOTE.")
    return Immutable
      .fromJS(commande)
      .set("type", typesEvenement.CHANGEMENT_JOUEUR_HOTE)
  }
  commandes[typesCommande.CHANGER_JOUEUR_VISITEUR] = function () {
    console.log("| CHANGER_JOUEUR_VISITEUR.")
    return Immutable
      .fromJS(commande)
      .set("type", typesEvenement.CHANGEMENT_JOUEUR_VISITEUR)
  }
  commandes[typesCommande.ENREGISTRER_COMMENTAIRE] = function () {
    console.log(`| Commentaire: ${commande.commentaire}.`)
    return Immutable
      .fromJS(commande)
      .set("type", typesEvenement.NOUVEAU_COMMENTAIRE)
  }
  let evenement = (commandes[commande.type] || commandes['DEFAUT'])();
  console.log("/ Evenement: " + evenement)
  console.log("-------------------")
  return evenement.toJS()
})

module.exports = {
  commande$,
  evenement$
}