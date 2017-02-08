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
  it("on peut modifier une rencontre", (done) => {
    Rx
      .Observable
      .of({
        type: typesEvenement.MAJ_RENCONTRE,
        idRencontre: 6,
        rencontre: {
          hote: {
            nom: "test"
          },
          visiteur: {
            nom: "testiiiiiiiiiiii"
          },
        }
      })
      .flatMap(evenement => {
        return Rencontres.traiter(evenement)
      })
      .subscribe(evenement => {
        console.log(` | type: ${evenement.type}.`)
        console.log(`${JSON.stringify(evenement)}`)
        console.log(`/`)
        done()
      }, err => {
        console.log(`Une erreur est survenue`)
        console.log(`Err: ${err}`)
      })
  })
})
