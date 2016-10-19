var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
console.log("Lancement de l'utilitaire de lecture.")
// const url = "mongodb://admin:pass@localhost:27017/test"
// const url = "mongodb://@localhost:27017/baskoredb"
// const url = "mongodb://organisateur:orga123@ds055905.mongolab.com:55905/heroku_5cn196b4"
const url = "mongodb://baskore:baskore123@ds015774.mlab.com:15774/heroku_cmw92kb6"
console.log("url de la base de donnée: " + url)

MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log("Base de données indisponible: " + err)
  } else {
    db.collection("rencontres")
      .find({
        // id: 2
      })
      .each((err, rencontre) => {
        if (err) {
          console.log("Erreur: " + err)
        }
        console.log("rencontre: " + JSON.stringify(rencontre))
      })
    db.collection("rencontres").count((err, nb) => {
      console.log("Taille de la base de donnée: " + nb)
    })
    db.close()

    // db.collection("rencontres")
    //   .find()
    //   .toArray(function (err, rencontres) {
    //     rencontres.forEach(rencontre =>
    //       console.log("Nouvel r: " + JSON.stringify(rencontre))
    //     )
    //     db.close()
    //   })
  }
})
