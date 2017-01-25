var Rx = require("rxjs")
var {MongoClient} = require('mongodb')
var Immutable = require("immutable")
var typesEvenement = require("./types-evenement")

var bdd;
var Rencontres = {
  connecte: false,
  connexion: function (url) {
    console.log(`Connexion: ${url}`)
    return Rx
      .Observable
      .create(function (subscriber) {
        MongoClient
          .connect(url, function (err, db) {
            if (err) {
              console.log(`Connexion en erreur: ${err}`)
              Rx
                .Observable
                .throw(err)
            } else {
              bdd = db
              console.log(` Connexion réussie.`)
              // subscriber.next(Math.random());
              subscriber.complete();
            }
          })
      })
  },
  deconnexion: function () {
    return bdd.close()
  },
  traiter: function (evenement) {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    console.log("\\ EVENEMENT: " + JSON.stringify(evenement.type))
    var evenements = {
      "DEFAUT": function () {
        console.log(`| defaut`)
        return Immutable.fromJS(evenement)
      }
    }
    evenements[typesEvenement.AJOUT_RENCONTRE] = evenement => {
      console.log(`| idRencontre`)
      return Rx
        .Observable
        .create(function (subscriber) {
          console.log(` Ajout rencontre.`)
          bdd
            .collection("rencontres")
            .find()
            .map(rencontre => rencontre.id)
            .toArray(function (err, ids) {
              let idCalcule = ids.reduce((max, id) => {
                console.log("rencontre id/max: " + id + "/" + max)
                return id > max
                  ? id
                  : max
              }, 0)
              // Calcul de l'identifiant de la nouvelle rencontre
              idCalcule++;
              console.log("Nouvel id: " + idCalcule)
              if (err) {
                console.log("Erreur: " + err)
                subscriber.error(err);
              } else {
                console.log('Envoie de la rencontre: ' + JSON.stringify(rencontre))
                subscriber.next(idCalcule)
                subscriber.complete();
              }
            })
        })
        .map(idCalcule => {
          var rencontre;
          rencontre.id = idCalcule
          rencontre.date = evenement.date
          rencontre.hote.nom = evenement.hote.nom
          rencontre.visiteur.nom = evenement.visiteur.nom
          // Insertion de la nouvelle rencontre
          bdd
            .collection("rencontres")
            .insert(rencontre, function (err, result) {
              if (err) {
                console.log("Chargement rencontres en erreur.")
              } else {
                console.log("Rencontres chargées: " + result)
                // Fermeture de la base de données
                db.close()
              }
            })
          return rencontre
        })
    }
    return (evenements[evenement.type] || evenements['DEFAUT'])(evenement);
  }
}

module.exports = Rencontres