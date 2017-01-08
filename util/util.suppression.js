var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
console.log("Lancement de l'utilitaire de suppression.")
// const url = "mongodb://admin:pass@localhost:27017/test"
const url = "mongodb://@localhost:27017/baskoredb"
console.log("url de la base de donnée: " + url)

MongoClient.connect(url, function (err, db) {
  db
    .collection("rencontres")
    .find()
    .filter(rencontre => {
      return rencontre != 3
    })
    .forEach((rencontre) => {
      console.log("rencontre: " + JSON.stringify(rencontre))
      db
        .collection("rencontres")
        .deleteOne({id: rencontre.id})
    })
  let rencontres = db
    .collection("rencontres")
    .find()
  rencontres.forEach((rencontre) => {
    console.log("rencontre: " + JSON.stringify(rencontre))
  })
  // db.close()
})
