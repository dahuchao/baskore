var chai = require("chai")
var {RxMongo, RxCollection} = require('rxmongo')
var Rencontres = require('../src/Rencontres')

var expect = chai.expect
var should = chai.should()

describe("Gestion des rencontres", () => {
  describe("Etant donné que la BDD n'est pas ouverte", () => {
    it("on peut lister les rencontres statiques de secours", (done) => {
      Rencontres
        .lecture
        .liste()
        .subscribe(rencontre => {
          // console.info(rencontre)

        }, err => {
          expect(err).to.not.exist
        }, () => done())
    })
    it("on peut lire une rencontre dans la liste statique de secours", (done) => {
      Rencontres
        .lecture
        .par
        .id(1)
        .subscribe(rencontre => {
          // console.info(rencontre)
          expect(rencontre).to.exist
          expect(rencontre.id)
            .to
            .equal(1)
        }, err => {
          expect(err).to.not.exist
        }, () => done())
    })
  })
  describe("Etant donné que la BDD est ouverte", () => {
    before((done) => {
      // console.info(`Connecté? ${Rencontres.connecte}`)
      if (!Rencontres.connecte) 
        Rencontres.connexion("mongodb://@localhost:27017/baskoredb").subscribe(db => {
          Rencontres.connecte = true
          // console.info(`Connecté? ${Rencontres.connecte}`)
        }, err => {
          console.log(`Err: ${err}`)
        }, () => done())
    })
    after((done) => {
      // console.info(`Connecté? ${Rencontres.connecte}`)
      Rencontres.deconnexion()
      done()
    })
    it("on peut lister les rencontres", (done) => {
      Rencontres
        .lecture
        .liste()
        .subscribe(rencontre => {
          console.info(rencontre)
        }, err => {
          expect(err).to.not.exist
        }, () => done())
    })
    it("on peut lire une rencontre", (done) => {
      Rencontres
        .lecture
        .par
        .id(3)
        .subscribe(rencontre => {
          // console.info(rencontre) expect(rencontre).to.exist
          expect(rencontre.id)
            .to
            .equal(3)
        }, err => {
          expect(err).to.not.exist
        }, () => done())
    })
    it("on peut ajouter une rencontre", (done) => {
      var rencontrer = {
        periode: 1,
        date: new Date("2016-09-01"),
        hote: {
          nom: "test hote",
          marque: 11
        },
        visiteur: {
          nom: "test visiteur",
          marque: 11
        }
      };
      Rencontres
        .ajouter(rencontrer)
        .subscribe(idRencontre => {
          console.info(`Id de la nouvelle rencontre: ${idRencontre}`)
          expect(idRencontre)
            .to
            .not
            .equal(0);
        }, err => {
          expect(err).to.not.exist
        }, () => done())
    })
    it("on peut supprimer une rencontre", (done) => {
      Rencontres
        .supprimer
        .par
        .critere({id: 4})
        .subscribe(result => {
          expect(result).to.exist;
          expect(result.result.ok)
            .to
            .equal(1);
        }, err => {
          expect(err).to.not.exist
        }, () => done())
    })
  })
})
