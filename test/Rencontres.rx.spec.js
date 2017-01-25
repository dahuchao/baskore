var chai = require("chai")
var Rx = require("rxjs")
var Rencontres = require('../src/Rencontres.1')
var controleur = require("../src/controleur")
var typesEvenement = require("../src/types-evenement")
var typesCommande = require("../src/types-commande")

var expect = chai.expect
var should = chai.should()

describe("Gestion des rencontres", () => {
  before((done) => {
    // console.info(`Connecté? ${Rencontres.connecte}`)
    if (!Rencontres.connecte) 
      Rencontres.connexion("mongodb://@localhost:27017/baskoredb").subscribe(db => {
        Rencontres.connecte = true
        console.info(`Connecté? ${Rencontres.connecte}`)
      }, err => {
        console.log(`Err: ${err}`)
      }, () => done())
  })
  after((done) => {
    // console.info(`Connecté? ${Rencontres.connecte}`)
    Rencontres.deconnexion()
    done()
  })
  it("on peut modifier une rencontre", (done) => {
    controleur
      .commande$
      .next({
        type: typesCommande.MAJ_RENCONTRE,
        idRencontre: 2,
        dateRencontre: new Date("2016-11-11"),
        hoteRencontre: "NRB",
        visiteurRencontre: "Montaigu",
        idSocket: 1
      });
    controleur
      .evenement$
      .flatMap(evenement => {
        if (!evenement.type.match(typesEvenement.LECTURE_RENCONTRE)) 
          return Rx.Observable.of(evenement)
        return Rencontres.traiter(evenement)
      })
      .scan((message, evenement) => {
        // console.log(` | evenement: ${JSON.stringify(evenement)}.`)
        if (evenement.type.match(typesEvenement.LECTURE_RENCONTRE)) 
          message.idRencontre = evenement.idRencontre
        message.evenement = evenement
        return message
      }, {
        idRencontre: 0,
        evenement: null
      })
      .filter(message => message.evenement != null)
      .filter(message => message.evenement.idRencontre == message.idRencontre)
      .subscribe(message => {
        console.log("\\---- Communication vers les tableaux de marque ---->")
        console.log(` | type: ${message.evenement.type}.`)
        console.log(`_| Envoi du message `)
        console.log(`${JSON.stringify(message)}`)
        console.log(`/`)
        done()
      }, err => {
        console.log(`Une erreur sur la lecture d'une rencontre est survenue`)
        console.log(`Err: ${err}`)
      }, () => done())
  })
  it("on peut lister les rencontres", (done) => {
    var deja = false
    controleur
      .commande$
      .next({type: typesCommande.LIRE_RENCONTRES, idSocket: 1});
    controleur
      .evenement$
      .flatMap(evenement => {
        if (!evenement.type.match(typesEvenement.LECTURE_RENCONTRES)) 
          return Rx.Observable.of(evenement)
        return Rencontres.traiter(evenement)
      })
      .scan((message, evenement) => {
        console.log(` | type: ${JSON.stringify(evenement)}.`)
        if (evenement.type.match(typesEvenement.LECTURE_RENCONTRE)) 
          message.idRencontre = evenement.idRencontre
        message.evenement = evenement
        return message
      }, {
        idRencontre: 0,
        evenement: null
      })
      .filter(message => message.evenement != null)
      .filter(message => message.evenement.idRencontre == message.idRencontre)
      .subscribe(message => {
        if (!deja) {
          deja = true
          console.log("\\---- Communication vers les tableaux de marque ---->")
          console.log(` | type: ${message.evenement.type}.`)
          console.log(`_| Envoi du message `)
          console.log(`${JSON.stringify(message)}`)
          console.log(`/`)
          done()
        }
      }, err => {
        console.log(`Une erreur est survenue lors de la lecture de la liste`)
        console.log(`${err}`)
      }, () => done())
  })
  it("on peut lire une rencontre", (done) => {
    controleur
      .commande$
      .next({type: typesCommande.LIRE_RENCONTRE, idRencontre: 2, idSocket: 1});
    controleur
      .evenement$
      .flatMap(evenement => {
        if (!evenement.type.match(typesEvenement.LECTURE_RENCONTRE)) 
          return Rx.Observable.of(evenement)
        return Rencontres.traiter(evenement)
      })
      .scan((message, evenement) => {
        // console.log(` | evenement: ${JSON.stringify(evenement)}.`)
        if (evenement.type.match(typesEvenement.LECTURE_RENCONTRE)) 
          message.idRencontre = evenement.idRencontre
        message.evenement = evenement
        return message
      }, {
        idRencontre: 0,
        evenement: null
      })
      .filter(message => message.evenement != null)
      .filter(message => message.evenement.idRencontre == message.idRencontre)
      .subscribe(message => {
        console.log("\\---- Communication vers les tableaux de marque ---->")
        console.log(` | type: ${message.evenement.type}.`)
        console.log(`_| Envoi du message `)
        console.log(`${JSON.stringify(message)}`)
        console.log(`/`)
        done()
      }, err => {
        console.log(`Une erreur sur la lecture d'une rencontre est survenue`)
        console.log(`Err: ${err}`)
      }, () => done())
  })
  it("on peut ajouter une rencontre", (done) => {
    controleur
      .commande$
      .next({
        type: typesCommande.AJOUTER_RENCONTRE,
        date: new Date("2016-11-11"),
        hote: {
          nom: "NRB-ajout"
        },
        visiteur: {
          nom: "Montaigu-ajout"
        },
        idSocket: 1
      });
    controleur
      .evenement$
      .flatMap(evenement => {
        if (!evenement.type.match(typesEvenement.AJOUT_RENCONTRE)) 
          return Rx.Observable.of(evenement)
        return Rencontres.traiter(evenement)
      })
      .scan((message, evenement) => {
        console.log(` | evenement: ${JSON.stringify(evenement)}.`)
        if (evenement.type.match(typesEvenement.LECTURE_RENCONTRE)) 
          message.idRencontre = evenement.idRencontre
        message.evenement = evenement
        return message
      }, {
        idRencontre: 0,
        evenement: null
      })
      .filter(message => message.evenement != null)
      .filter(message => message.evenement.idRencontre == message.idRencontre)
      .subscribe(message => {
        console.log("\\---- Communication vers les tableaux de marque ---->")
        console.log(` | type: ${message.evenement.type}.`)
        console.log(`_| Envoi du message `)
        console.log(`${JSON.stringify(message)}`)
        console.log(`/`)
        done()
      }, err => {
        console.log(`Une erreur sur la lecture d'une rencontre est survenue`)
        console.log(`Err: ${err}`)
      }, () => done())
  })
})
