var chai = require("chai");
var Rx = require("rxjs");
var Rencontres = require('../src/Rencontres');
var typesEvenement = require("../client/src/types-evenement");

describe("Gestion des rencontres", () => {
  before((done) => {
    if (!Rencontres.connecte) 
      Rencontres.connexion("mongodb://@localhost:27017/baskoredb").subscribe(db => {
        Rencontres.connecte = true;
        console.info(`Connecté? ${Rencontres.connecte}`);
      }, err => {
        console.log(`Err: ${err}`);
      }, () => done());
    }
  );
  after((done) => {
    Rencontres.deconnexion();
    done();
  });
  it("lecture d'une rencontre", (done) => {
    let message$ = Rencontres.traiter({type: typesEvenement.LECTURE_RENCONTRE, idRencontre: 14});
    message$.subscribe(message => {
      console.log(`idRencontre: ${message.idRencontre}.`);
      done();
    }, erreur => {
      console.log(`erreur.`);
      done();
    });
  });
});
