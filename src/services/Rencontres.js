var Immutable = require("immutable")
const MongoClient = require("mongodb").MongoClient

const Rencontres = function (db) {
  function lecture(id) {
    const rencontres = Immutable.List
    if (!db) 
      console.log("Base de données indisponible.")
    else 
      db
        .collection("rencontres")
        .find({id: 4})
        .each((err, rencontre) => {
          if (err) 
            console.log("Erreur: " + err)
          if (rencontre) 
            rencontres.push(rencontre)
          console.log("rencontre: " + JSON.stringify(rencontre))
        })
    return rencontres
  }
}

module.exports = {
  Rencontres : Rencontres
}