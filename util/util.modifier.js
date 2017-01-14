var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var Immutable = require('immutable')

console.log("Lancement de l'utilitaire de modification.")
// const url = "mongodb://admin:pass@localhost:27017/test"
const url = "mongodb://@localhost:27017/baskoredb"
// const url = "mongodb://organisateur:orga123@ds055905.mongolab.com:55905/heroku_5cn196b4"
// const url = "mongodb://baskore:baskore123@ds015774.mlab.com:15774/heroku_cmw92kb6"
console.log("url de la base de donnée: " + url)

MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log("Base de données indisponible: " + err)
  } else {
    let i = 1
    db.collection("rencontres")
      .find({
        // id: 2
      })
      .each((err, rencontre) => {
        if (err) {
          console.log("Erreur: " + err)
        }
        else if (rencontre != null) {
          console.log("rencontre: " + JSON.stringify(rencontre))
          let rencontreDatee = ajouterDate(rencontre)
          console.log("rencontreDatee: " + JSON.stringify(rencontreDatee))
          // db.collection("rencontres").update({
          //   _id: rencontre._id
          // }, rencontreDatee)
        } else {
          // Fermeture de la base de données
          db.close();
        }
      })
  }
})

function ajouterDate(rencontre) {
  let rencontreDatee = Immutable
    .fromJS(rencontre)
    .set("date", new Date())
  return rencontreDatee.toObject()
}
