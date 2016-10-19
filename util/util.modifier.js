var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
console.log("Lancement de l'utilitaire: ")
//var urlParDefaut = "mongodb://admin:pass@localhost:27017/test"
// var urlParDefaut = "mongodb://@localhost:27017/baskoredb"
var urlParDefaut = "mongodb://dahu:azerty@localhost:27017/baskoredb"
//PROD_MONGODB=mongodb://dbuser:dbpass@host1:port1/dbname
const url = (process.env.MONGOLAB_URI || urlParDefaut)
console.log("url de la base de donnée: " + url)

MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log("Base de données indisponible: " + err)
  } else {
    db.collection("rencontres")
      .find({
        id: 2
      })
      .each((err, rencontre) => {
        if (err) {
          console.log("Erreur: " + err)
        }
        console.log("rencontre: " + JSON.stringify(rencontre))
        if (rencontre != null) {
          rencontre.date = new Date()
          db.collection("rencontres").update({
            _id: rencontre._id
          }, rencontre)
          // Fermeture de la base de données
          db.close();
        }
      })
  }
})
