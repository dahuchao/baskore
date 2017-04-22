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
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
    console.log(`\\ EVENEMENT: ${JSON.stringify(evenement.type)}`)
    var evenements = {
      "DEFAUT": function () {
        console.log(`| defaut`)
        return Rx
          .Observable
          .of(evenement)
      }
    }
    evenements[typesEvenement.AJOUT_RENCONTRE] = evenement => {
      console.log(`| rencontre: ${JSON.stringify(evenement.rencontre)}`)
      return Rx
        .Observable
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
        .flatMap(idCalcule => {
          var rencontre = {
            id: idCalcule,
            date: evenement.rencontre.date,
            hote: evenement.rencontre.hote,
            visiteur: evenement.rencontre.visiteur,
            termine: false
          }
          // Insertion de la nouvelle rencontre
          return Rx
            .Observable
            .create(function (subscriber) {
              bdd
                .collection("rencontres")
                .insert(rencontre, function (err, result) {
                  if (err) {
                    console.log(`Enregistrement en erreur: ${err}.`)
                    subscriber.error(err);
                  } else {
                    console.log(`Rencontre enregistrée: ${JSON.stringify(result)}.`)
                    var nevenement = Immutable
                      .fromJS(evenement)
                      .set("rencontre", rencontre)
                      .toJS()
                    console.log(`Rencontre enregistrée: ${JSON.stringify(nevenement)}.`)
                    subscriber.next(nevenement)
                    subscriber.complete();
                  }
                })
            })
        })
    }
    evenements[typesEvenement.MAJ_RENCONTRE] = evenement => {
      console.log(`| idRencontre: ${evenement.idRencontre}`)
      return Rx
        .Observable
        .create(function (subscriber) {
          console.log(` Lecture rencontre.`)
          bdd
            .collection("rencontres")
            .findOne({
              id: parseInt(evenement.idRencontre)
            }, function (err, rencontre) {
              if (err) {
                console.log("Erreur: " + err)
                subscriber.error(err);
              } else if (rencontre == null) {
                console.log("Fin de lecture.")
                // subscriber.complete();
              } else {
                console.log('Envoie de la rencontre: ' + JSON.stringify(rencontre))
                subscriber.next(rencontre)
                subscriber.complete();
              }
            })
        })
        .first()
        .flatMap(rencontre => {
          console.log(` rencontre mise à jour: ${rencontre._id}.`)
          console.log(` rencontre à modifier : ${JSON.stringify(rencontre)}.`)
          console.log(` rencontre nouvelle : ${JSON.stringify(evenement.rencontre)}.`)
          rencontre.date = evenement.rencontre.date
          rencontre.hote.nom = evenement.rencontre.hote.nom
          rencontre.visiteur.nom = evenement.rencontre.visiteur.nom
          rencontre.termine = evenement.rencontre.termine
          console.log(` rencontre : ${JSON.stringify(rencontre)}.`)
          return Rx
            .Observable
            .create(subscriber => {
              bdd
                .collection("rencontres")
                .update({
                  _id: rencontre._id
                }, rencontre, function (err) {
                  if (err) {
                    console.log(`Mise à jour en erreur: ${err}.`)
                    subscriber.error(err);
                  } else {
                    console.log(`Mise à jour enregistrée.`)
                    subscriber.next(rencontre)
                    subscriber.complete();
                  }
                })
            })
        })
        .map(rencontre => {
          evenement.rencontre = rencontre
          return evenement
        })
    }
    evenements[typesEvenement.LECTURE_RENCONTRE] = evenement => {
      console.log(`| idRencontre: ${evenement.idRencontre}`)
      return Rx
        .Observable
        .create(function (subscriber) {
          console.log(` Lecture rencontre.`)
          bdd
            .collection("rencontres")
            .findOne({
              id: parseInt(evenement.idRencontre)
            }, function (err, rencontre) {
              if (err) {
                console.log("Erreur: " + err)
                // subscriber.error(err);
              } else if (rencontre == null) {
                console.log("Fin de lecture.")
                // subscriber.complete();
              } else {
                console.log('Envoie de la rencontre: ' + JSON.stringify(rencontre))
                subscriber.next(rencontre)
                subscriber.complete();
              }
            })
        })
        .first()
        .map(rencontre => {
          evenement.rencontre = rencontre
          return evenement
        })
    }
    evenements[typesEvenement.SUPPRESSION_RENCONTRE] = evenement => {
      console.log(`| idRencontre: ${evenement.idRencontre}`)
      return Rx
        .Observable
        .create(function (subscriber) {
          console.log(` Suppression rencontre.`)
          return bdd
            .collection("rencontres")
            .remove({
              id: parseInt(evenement.idRencontre)
            }, function (err, result) {
              if (err) {
                console.log("Erreur: " + err)
                subscriber.error(err);
              } else {
                console.log(`Résultat suppression: ${JSON.stringify(result)}`)
                subscriber.next(evenement)
                subscriber.complete();
              }
            })
        })
    }
    evenements[typesEvenement.LECTURE_RENCONTRES] = evenement => {
      console.log(`| Traitement type: ${evenement.type}`)
      return Rx
        .Observable
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
                console.log(`Envoie rencontre: ${JSON.stringify(rencontre.id)}`)
                subscriber.next(rencontre)
              }
            })
        })
        .reduce((liste, rencontre) => {
          liste.push(rencontre)
          return liste
        }, [])
        .map(rencontres => {
          evenement.rencontres = rencontres
          return evenement
        })
    }
    evenements[typesEvenement.CHANGEMENT_MARQUE] = evenement => {
      console.log(`| Nouvelle marque ${evenement.marqueHote}:${evenement.marqueVisiteur}`)
      return Rx
        .Observable
        .create(function (subscriber) {
          console.log(` Lecture rencontre.`)
          bdd
            .collection("rencontres")
            .findOne({
              id: parseInt(evenement.idRencontre)
            }, function (err, rencontre) {
              if (err) {
                console.log("Erreur: " + err)
                subscriber.error(err);
              } else if (rencontre == null) {
                console.log("Fin de lecture.")
                // subscriber.complete();
              } else {
                console.log('Envoie de la rencontre: ' + JSON.stringify(rencontre))
                subscriber.next(rencontre)
                subscriber.complete();
              }
            })
        })
        .first()
        .flatMap(rencontre => {
          console.log(` rencontre mise à jour: ${rencontre._id}.`)
          console.log(` rencontre à modifier : ${JSON.stringify(rencontre)}.`)
          console.log(` rencontre nouvelle : ${JSON.stringify(evenement.rencontre)}.`)
          rencontre.hote.marque = evenement.marqueHote
          rencontre.visiteur.marque = evenement.marqueVisiteur
          console.log(` rencontre : ${JSON.stringify(rencontre)}.`)
          return Rx
            .Observable
            .create(subscriber => {
              bdd
                .collection("rencontres")
                .update({
                  _id: rencontre._id
                }, rencontre, function (err) {
                  if (err) {
                    console.log(`Mise à jour en erreur: ${err}.`)
                    subscriber.error(err);
                  } else {
                    console.log(`Mise à jour enregistrée.`)
                    subscriber.next(rencontre)
                    subscriber.complete();
                  }
                })
            })
        })
    }
    evenements[typesEvenement.CHANGEMENT_PERIODE] = evenement => {
      console.log("| Nouvelle période: " + JSON.stringify(evenement.periode))
      return Rx
        .Observable
        .create(function (subscriber) {
          console.log(` Lecture rencontre.`)
          bdd
            .collection("rencontres")
            .findOne({
              id: parseInt(evenement.idRencontre)
            }, function (err, rencontre) {
              if (err) {
                console.log("Erreur: " + err)
                subscriber.error(err);
              } else if (rencontre == null) {
                console.log("Fin de lecture.")
                // subscriber.complete();
              } else {
                console.log('Envoie de la rencontre: ' + JSON.stringify(rencontre))
                subscriber.next(rencontre)
                subscriber.complete();
              }
            })
        })
        .first()
        .flatMap(rencontre => {
          console.log(` rencontre mise à jour: ${rencontre._id}.`)
          console.log(` rencontre à modifier : ${JSON.stringify(rencontre)}.`)
          console.log(` rencontre nouvelle : ${JSON.stringify(evenement.rencontre)}.`)
          rencontre.periode = evenement.periode
          console.log(` rencontre : ${JSON.stringify(rencontre)}.`)
          return Rx
            .Observable
            .create(subscriber => {
              bdd
                .collection("rencontres")
                .update({
                  _id: rencontre._id
                }, rencontre, function (err) {
                  if (err) {
                    console.log(`Mise à jour en erreur: ${err}.`)
                    subscriber.error(err);
                  } else {
                    console.log(`Mise à jour enregistrée.`)
                    subscriber.next(rencontre)
                    subscriber.complete();
                  }
                })
            })
        })
    }
    evenements[typesEvenement.NOUVEAU_COMMENTAIRE] = evenement => {
      console.log(`| Nouveau commentaire sur la rencontre: ${evenement.commentaire}`)
      return Rx
        .Observable
        .create(function (subscriber) {
          console.log(` Lecture rencontre.`)
          bdd
            .collection("rencontres")
            .findOne({
              id: parseInt(evenement.idRencontre)
            }, function (err, rencontre) {
              if (err) {
                console.log("Erreur: " + err)
                subscriber.error(err);
              } else if (rencontre == null) {
                console.log("Fin de lecture.")
                // subscriber.complete();
              } else {
                console.log('Envoie de la rencontre: ' + JSON.stringify(rencontre))
                subscriber.next(rencontre)
                subscriber.complete();
              }
            })
        })
        .first()
        .flatMap(rencontre => {
          console.log(` rencontre mise à jour: ${rencontre._id}.`)
          console.log(` rencontre à modifier : ${JSON.stringify(rencontre)}.`)
          console.log(` rencontre nouvelle : ${JSON.stringify(evenement.rencontre)}.`)
          let commentaires = Immutable
            .fromJS(rencontre)
            .get("commentaires", Immutable.List())
            .push(evenement.commentaire)
          console.log(`| Enregistrement du commentaire en base: ${commentaires}`)
          rencontre.commentaires = commentaires.toJS()
          console.log(` rencontre : ${JSON.stringify(rencontre)}.`)
          return Rx
            .Observable
            .create(subscriber => {
              bdd
                .collection("rencontres")
                .update({
                  _id: rencontre._id
                }, rencontre, function (err) {
                  if (err) {
                    console.log(`Mise à jour en erreur: ${err}.`)
                    subscriber.error(err);
                  } else {
                    console.log(`Mise à jour enregistrée.`)
                    subscriber.next(rencontre)
                    subscriber.complete();
                  }
                })
            })
        })
    }
    return (evenements[evenement.type] || evenements['DEFAUT'])(evenement);
  }
}

module.exports = Rencontres