var Rx = require("rxjs")
var {RxMongo, RxCollection} = require('rxmongo')
var {MongoClient} = require('mongodb')

var rencontre$ = Rx
  .Observable
  .from([
    {
      id: 1,
      periode: 1,
      hote: {
        nom: "NEC",
        marque: 11
      },
      visiteur: {
        nom: "USJA",
        marque: 11
      }
    }, {
      id: 2,
      date: new Date("2016-09-02"),
      periode: 1,
      hote: {
        nom: "NEC",
        marque: 22
      },
      visiteur: {
        nom: "Montaigu",
        marque: 22
      }
    }, {
      id: 3,
      periode: 1,
      date: new Date("2016-10-16"),
      hote: {
        nom: "NEC",
        marque: 33
      },
      visiteur: {
        nom: "Coulaine",
        marque: 33
      }
    }
  ]);

var Rencontres = {
  connecte: false,
  connexion: function (url) {
    // console.log(`Connexion: ${url}`)
    return RxMongo.connect(url)
  },
  deconnexion: function () {
    return RxMongo.disconnect()
  },
  lecture: {
    liste: function () {
      // console.log(`Connecté? ${Rencontres.connecte}`)
      if (Rencontres.connecte) 
        return new RxCollection("rencontres").find({}).toArray()
      else 
        return rencontre$
    },
    par: {
      id: function (idRencontre) {
        if (Rencontres.connecte) 
          return new RxCollection("rencontres").find({id: idRencontre}).first()
        else 
          return rencontre$.filter(rencontre => {
            // console.log(`Rencontre: ${JSON.stringify(rencontre)}`)
            return rencontre.id == idRencontre
          })
      }
    }
  },
  ajouterr: function (rencontre) {

    if (Rencontres.connecte) 
      return RxMongo.collection("rencontres").flatMap(rencontres => RxMongo.insert(rencontres, rencontre))
  },
  ajouter: function (rencontreNouvelle) {
    console.log(`Connexion: ${Rencontres.connecte}`)
    if (Rencontres.connecte) {
      return new RxCollection("rencontres")
        .find({})
        .toArray()
        .flatMap(rencontres => {
          console.info(`rencontres: ${JSON.stringify(rencontres)}`)
          return rencontres
        })
        .map(rencontre => {
          // console.log(`rencontre id: ${rencontre.id}`)
          return rencontre.id
        })
        .max()
        .map(idCourant => {
          console.log(`rencontre idCourant: ${idCourant}`)
          return idCourant + 1;
        })
        .map(idCalcule => {
          console.log(`rencontre idCalcule: ${idCalcule}`)
          rencontreNouvelle.id = idCalcule
          return rencontreNouvelle
        })
        .flatMap(rencontreAAjouter => {
          // console.log(`rencontre: ${JSON.stringify(rencontreAAjouter)}`)
          return new RxCollection("rencontres")
            .insert(rencontreAAjouter)
            .map(result => {
              // console.info(result)
              if (!result) 
                return 0
              if (result.result.ok != 1) 
                return 0
              if (result.insertedCount == 1) 
                return rencontreAAjouter.id
            })
        })
    }
  },
  max: function () {
    console.log(`Connexion: ${Rencontres.connecte}`)
    if (Rencontres.connecte) {
      return new RxCollection("rencontres")
        .find({})
        .toArray()
        .flatMap(rencontres => {
          console.info(`rencontree id: ${rencontres}`)
          return rencontres
        })
        .map(rencontre => {
          console.log(`rencontre id: ${rencontre.id}`)
          return rencontre.id
        })
    }
  },
  supprimer: {
    par: {
      critere: function (critere) {
        if (Rencontres.connecte) 
          return new RxCollection("rencontres").deleteOne(critere)
      }
    }
  }
}

module.exports = Rencontres