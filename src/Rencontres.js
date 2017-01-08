var Rx = require("rxjs")
var {RxMongo, RxCollection} = require('rxmongo')
var {MongoClient} = require('mongodb')

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
    } else {


      // console.log("Base de données indisponible: ")
      // console.log("Utilisation liste statique de test.")
      // // Calcul du plus grand identifiant
      // idCalcule = rencontres.reduce((max, rencontre) => rencontre.id > max
      //   ? rencontre.id
      //   : max, 0)
      // // Calcul de l'identifiant de la nouvelle rencontre
      // rencontre.id = idCalcule + 1
      // // Calcul de la nouvelle liste des rencontres
      // rencontres = [
      //   ...rencontres,
      //   rencontre
      ]


    }
  },
  mettreAJour: {
    par: {
      critere: function (critere, rencontreMAJ) {
        console.log(`Critère de mise à jour: ${JSON.stringify(critere)}`)
        if (Rencontres.connecte) {
          return new RxCollection("rencontres")
            .find(critere)
            .first()
            .flatMap(rencontre => {
              rencontre.date = rencontreMAJ.date
              rencontre.hote.nom = rencontreMAJ.hote.nom
              rencontre.visiteur.nom = rencontreMAJ.visiteur.nom
              return new RxCollection("rencontres")
                .updateOne(critere, rencontre)
                .map(result => {
                  // console.info(result)
                  return result
                })
            })
        }
      }
    }
  },
  supprimer: {
    par: {
      critere: function (critere) {
        console.log(`Critère de suppression: ${JSON.stringify(critere)}`)
        if (Rencontres.connecte) 
          return new RxCollection("rencontres").deleteOne(critere)
      }
    }
  }
}

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

module.exports = Rencontres