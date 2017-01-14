var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
console.log("Lancement de l'utilitaire de lecture.")
// const url = "mongodb://admin:pass@localhost:27017/test"
const url = "mongodb://@localhost:27017/baskoredb"
console.log("url de la base de donnée: " + url)

MongoClient.connect(url, (err, db) => {
  if (err) {
    console.log("Base de données indisponible: " + err)
    return
  }
  db
    .collection("rencontres")
    .find()
    .each((err, rencontre) => {
      if (err) {
        console.log("Erreur: " + err)
        return
      }
      if (rencontre==null) {
        return
      }
      if (rencontre.hote.nom.match("test .*")) 
        console.log("rencontre****: " + JSON.stringify(rencontre))
    })
  db
    .collection("rencontres")
    .count((err, nb) => {
      console.log("Taille de la base de donnée: " + nb)
    })
  db.close()

  // db.collection("rencontres")   .find()   .toArray(function (err, rencontres) {
  //     rencontres.forEach(rencontre =>       console.log("Nouvel r: " +
  // JSON.stringify(rencontre))     )     db.close()   })
})
