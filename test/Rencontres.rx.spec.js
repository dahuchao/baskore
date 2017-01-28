var chai = require("chai")
var Rx = require("rxjs")
var Rencontres = require('../src/Rencontres')
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
  it("on peut ajouter une rencontre", (done) => {
    controleur
      .commande$
      .next({
        type: typesCommande.AJOUTER_RENCONTRE,
        rencontre: {
          date: new Date("2016-11-11"),
          hote: {
            nom: "NRB-ajout"
          },
          visiteur: {
            nom: "Montaigu-ajout"
          },
          idSocket: 1
        }
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
        console.log(`Une erreur sur l'écriture d'une rencontre est survenue`)
        console.log(`Err: ${err}`)
      }, () => done())
  })
})
