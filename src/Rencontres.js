var { Observable } = require("rxjs")
var { MongoClient } = require('mongodb')
var Immutable = require("immutable")
var typesEvenement = require("../client/src/types-evenement")

var bdd;
var Rencontres = {
  connecte: false,
  connexion: function (url) {
    console.log(`Connexion: ${url}`)
    return Observable
      .create(function (subscriber) {
        MongoClient
          .connect(url, function (err, db) {
            if (err) {
              Observable.throw(err)
            } else {
              bdd = db
              // subscriber.next(Math.random());
              subscriber.complete();
            }
          })
        }
      )
      .do(null, err => console.log(`Connexion en erreur: ${err}.`))
      .do(null, null, () => console.log(`Connexion réussie.`))
  },
  deconnexion: function () {
    return bdd.close()
  },
  traiter: function (evenement) {
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
    console.log(`\\ EVENEMENT: ${JSON.stringify(evenement.type)}`)
    var evenements = {
      "DEFAUT": function () {
        console.log(`| defaut`)
        return Observable.of(evenement)
      }
    }
    evenements[typesEvenement.AJOUT_RENCONTRE] = evenement => {
      // console.log(`| rencontre: ${JSON.stringify(evenement.rencontre)}`)
      return Observable
        .create(function (subscriber) {
          bdd
            .collection("rencontres")
            .find()
            .map(rencontre => rencontre.id)
            .toArray(function (err, id$) {
              if (err) {
                console.log(`Erreur sur l'ajout d'une rencontre: ${err}.`)
                subscriber.error(err);
              } else if (id$ == null) {
                subscriber.next(0)
                subscriber.complete();
              } else {
                let idMax = id$.reduce((max, id) => {
                  return id > max
                    ? id
                    : max
                }, 0)
                console.log(`| ID max: ${idMax}.`)
                // Calcul de l'identifiant de la nouvelle rencontre
                let idCalcule = ++idMax;
                console.log(`| Nouvel ID: ${idCalcule}.`)
                subscriber.next(idCalcule)
                subscriber.complete();
              }
            })
        })
        .flatMap(idCalcule => inserer({
            id: idCalcule,
            date: evenement.rencontre.date,
            hote: evenement.rencontre.hote,
            visiteur: evenement.rencontre.visiteur,
            termine: false
          })
        )
        .map(rencontre => Immutable.fromJS(evenement).set("rencontre", rencontre).toJS())
    }
    evenements[typesEvenement.MAJ_RENCONTRE] = evenement => {
      console.log(`| idRencontre: ${evenement.idRencontre}`)
      return rechercher(evenement.idRencontre)
        .first()
        .flatMap(rencontre => {
          rencontre.date = evenement.rencontre.date
          rencontre.hote.nom = evenement.rencontre.hote.nom
          rencontre.visiteur.nom = evenement.rencontre.visiteur.nom
          rencontre.termine = evenement.rencontre.termine
          return mettreAJour(rencontre)
        })
        .map(rencontre => Immutable.fromJS(evenement).set("rencontre", rencontre).toJS())
    }
    evenements[typesEvenement.LECTURE_RENCONTRE] = evenement => {
      console.log(`| LECTURE_RENCONTRE idRencontre: ${evenement.idRencontre}`);
      return rechercher(evenement.idRencontre)
        .do(rencontre => console.log(`Chargement rencontre: ${JSON.stringify(rencontre)}`))
        .flatMap(rencontre => {
          // Calcul de l'audience
          let audience = rencontre.audience ? rencontre.audience : 0;
          // Augmentation de l'audience
          rencontre.audience = ++audience;
          // Calcul des tables de marque
          let tables = rencontre.tables ? rencontre.tables : [];
          // Enregistrement d'une nouvelle table de marque
          tables.push(evenement.idSocket);
          // const rencontreModifiee = rencontre
          rencontre.tables = tables;
          return mettreAJour(rencontre)
        })
        .map(rencontre => Immutable.fromJS(evenement).set("rencontre", rencontre).toJS())
        .do((evenement) => console.log(`Mise à jour enregistrée: ${JSON.stringify(evenement)}.`))
        .do(null, err => console.log(`Mise à jour en erreur: ${err}.`))
    }
    evenements[typesEvenement.FERMETURE_RENCONTRE] = evenement => {
      console.log(`| idRencontre: ${evenement.idRencontre}`)
      return rechercher(evenement.idRencontre)
        .first()
        .flatMap(rencontre => {
          // let rencontre = evenement.rencontre
          // Calcul de l'audience
          let audience = rencontre.audience ? rencontre.audience : 0;
          // Diminution de l'audience
          if (audience > 0) --audience
          rencontre.audience = audience;
          // Calcul des tables de marque
          let tables = rencontre.tables ? rencontre.tables : [];
          // Enregistrement d'une nouvelle table de marque
          rencontre.tables = rencontre.tables.filter((t)=> t != evenement.idSocket)
          return mettreAJour(rencontre)
        })
        .map(rencontre => Immutable.fromJS(evenement).set("rencontre", rencontre).toJS())
      }
    evenements[typesEvenement.SUPPRESSION_RENCONTRE] = evenement => {
      console.log(`| idRencontre: ${evenement.idRencontre}`)
      return suppression(evenement)
    }
    evenements[typesEvenement.LECTURE_RENCONTRES] = evenement => {
      console.log(`| Traitement type: ${evenement.type}`)
      return Observable
        .create(function (subscriber) {
          console.log(` Lecture.`)
          bdd
            .collection("rencontres")
            .find()
            .each(function (err, rencontre) {
              if (err) {
                console.log("Erreur: " + err)
                subscriber.error(err);
              } else if (rencontre == null) {
                console.log("Fin de lecture.")
                subscriber.complete();
              } else {
                console.log(`Sélection rencontre: ${JSON.stringify(rencontre.id)}`)
                subscriber.next(rencontre)
              }
            }
          )
        }
      )
      .reduce((liste, rencontre) => {
        liste.push(rencontre)
        return liste
      }, [])
      .map(rencontres => Immutable.fromJS(evenement).set("rencontres", rencontres).toJS())
    }
    evenements[typesEvenement.CHANGEMENT_MARQUE] = evenement => {
      console.log(`| Nouvelle marque ${evenement.marqueHote}:${evenement.marqueVisiteur}`)
      return rechercher(evenement.idRencontre)
        .first()
        .flatMap(rencontre => {
          rencontre.hote.marque = evenement.marqueHote
          rencontre.visiteur.marque = evenement.marqueVisiteur
          if(rencontre.histoMarques==null)
            rencontre.histoMarques = [];
          rencontre.histoMarques.push({
            marqueHote: evenement.marqueHote, 
            marqueVisiteur: evenement.marqueVisiteur,
            periode: rencontre.periode
          });        
          return mettreAJour(rencontre)
        })
        .map(rencontre => Immutable.fromJS(evenement).set("rencontre", rencontre).toJS())
    }
    evenements[typesEvenement.CHANGEMENT_PERIODE] = evenement => {
      console.log("| Nouvelle période: " + JSON.stringify(evenement.periode))
      return rechercher(evenement.idRencontre)
        .first()
        .flatMap(rencontre => {
          rencontre.periode = evenement.periode
          return mettreAJour(rencontre)
        })
        .map(rencontre => Immutable.fromJS(evenement).set("rencontre", rencontre).toJS())
    }
    evenements[typesEvenement.NOUVEAU_COMMENTAIRE] = evenement => {
      console.log(`| Nouveau commentaire sur la rencontre: ${evenement.commentaire}`)
      return rechercher(evenement.idRencontre)
        .first()
        .flatMap(rencontre => {
          let commentaires = Immutable
            .fromJS(rencontre)
            .get("commentaires", Immutable.List())
            .push(evenement.commentaire)
          console.log(`| Enregistrement du commentaire en base: ${commentaires}`)
          rencontre.commentaires = commentaires.toJS()
          return mettreAJour(rencontre)
        })
        .map(rencontre => Immutable.fromJS(evenement).set("rencontre", rencontre).toJS())
    }
    return (evenements[evenement.type] || evenements['DEFAUT'])(evenement);
  }
}

const mettreAJour = rencontre => Observable
  .create(subscriber => {
    bdd
    .collection("rencontres")
    .update({
      _id: rencontre._id
    }, rencontre, function (err) {
      if (err) {
        subscriber.error(err);
      } else {
        subscriber.next(rencontre)
        subscriber.complete();
      }
    })
  })   
  .do((rencontre) => console.log(`Mise à jour enregistrée: ${JSON.stringify(rencontre)}.`))
  .do(null, err => console.log(`Mise à jour en erreur: ${err}.`))

const rechercher = id => Observable
  .create(function (subscriber) {
    bdd
      .collection("rencontres")
      .findOne({
        id: parseInt(id)
      }, function (err, rencontre) {
        if (rencontre) {
          subscriber.next(rencontre);
          subscriber.complete();
        }
      })
    }
  )
  .do((rencontre) => console.log(`Lecture rencontre: ${JSON.stringify(rencontre)}.`))
  .do(null, err => console.log(`Lecture en erreur: ${err}.`))

const inserer = rencontre => Observable
  .create(function (subscriber) {
    bdd.collection("rencontres")
      .insert(rencontre, function (err, result) {
        if (err) {
            subscriber.error(err);
        }
        else {
          subscriber.next(rencontre)
          subscriber.complete();
        }
        }
      )
    }
  )
  .do((rencontre) => console.log(`Insertion rencontre: ${JSON.stringify(rencontre)}.`))
  .do(null, err => console.log(`Insertion en erreur: ${err}.`))

const suppression = evenement => Observable
  .create(function (subscriber) {
    return bdd
      .collection("rencontres")
      .remove({
        id: parseInt(evenement.idRencontre)
      }, function (err, result) {
        if (err) {
          subscriber.error(err);
        } else {
          console.log(`Résultat suppression: ${JSON.stringify(result)}`)
          subscriber.next(evenement)
          subscriber.complete();
        }
      }
    )
  }
)
.do((evenement) => console.log(`Suppression rencontre.`))
.do(null, err => console.log(`Suppression en erreur: ${err}.`))

module.exports = Rencontres