var MongoClient = require('mongodb').MongoClient;
console.log("Lancement de l'utilitaire de migration.")
var urlHeroku = "mongodb://baskore:baskore123@ds015774.mlab.com:15774/heroku_cmw92kb6"
console.log("url de la base de donnée source: " + urlHeroku)
var urlLocale = "mongodb://@localhost:27017/baskoredb"
console.log("url de la base de donnée locale: " + urlLocale)

MongoClient.connect(urlHeroku, function (err, dbH) {
  if (err) {
    console.log("Base de données indisponible: " + err)
  } else {
    MongoClient.connect(urlLocale, function (err, dbL) {
      dbH.collection("rencontres")
        .find()
        .each((err, rencontre) => {
          if (err) {
            console.log("Base de données indisponible: " + err)
          } else if (rencontre != null) {
            console.log("rencontre: " + JSON.stringify(rencontre))
            dbL.collection("rencontres").insert(rencontre)
          } else {
            dbL.close();
            dbH.close();
          }
        })
    })
  }
})
