var Rx = require("rxjs")
var Immutable = require("immutable")
var typesCommande = require("./types-commande")
var typesEvenement = require("./types-evenement")

var commande$ = new Rx.BehaviorSubject({type: "DEFAUT"})

var evenement$ = commande$.map(commande => {
  console.log("##############################")
  console.log(`\\ COMMANDE: ${commande.type}`)
  console.log(`\\ ${JSON.stringify(commande)}`)
  let commandes = {
    "DEFAUT": function (commande) {
      return Immutable.fromJS(commande)
    },
    [typesCommande.CREER_CONNEXION]: commande => {
      console.log(`| idSocket ${commande.idSocket}`)
      return Immutable
        .fromJS(commande)
        .set("type", typesEvenement.CREATION_CONNEXION)
    },
    [typesCommande.LIRE_RENCONTRE]: commande => {
      console.log(`| idRencontre ${commande.idRencontre}`)
      console.log(`| idSocket ${commande.idSocket}`)
      return Immutable
        .fromJS(commande)
        .set("type", typesEvenement.LECTURE_RENCONTRE)
    },
    [typesCommande.PANIER_MARQUE]: commande => {
      console.log(`| Nouvelle marque ${commande.marqueHote}:${commande.marqueVisiteur}`)

      return Immutable
        .fromJS(commande)
        .set("type", typesEvenement.CHANGEMENT_MARQUE)
    },
    [typesCommande.CHANGER_PERIODE]: commande => {
      console.log(`| Nouvelle periode: ${commande.periode}`)
      return Immutable
        .fromJS(commande)
        .set("type", typesEvenement.CHANGEMENT_PERIODE)
    },
    [typesCommande.CHANGER_JOUEUR_HOTE]: commande => {
      console.log(`| Nouvelles joueuses hote : ${commande.joueuses}`)
      return Immutable
        .fromJS(commande)
        .set("type", typesEvenement.CHANGEMENT_JOUEUR_HOTE)
    },
    [typesCommande.CHANGER_JOUEUR_VISITEUR]: commande => {
      console.log(`| Nouvelles joueuses visiteur : ${commande.joueuses}`)
      return Immutable
        .fromJS(commande)
        .set("type", typesEvenement.CHANGEMENT_JOUEUR_VISITEUR)
    },
    [typesCommande.ENREGISTRER_COMMENTAIRE]: commande => {
      console.log(`| Commentaire: ${commande.commentaire}.`)
      return Immutable
        .fromJS(commande)
        .set("type", typesEvenement.NOUVEAU_COMMENTAIRE)
    }
  }
  let evenement = (commandes[commande.type] || commandes['DEFAUT'])(commande);
  console.log("/ Evenement: " + evenement)
  console.log(">-------------------------------")
  return evenement.toJS()
})

module.exports = {
  commande$,
  evenement$
}