import chai from "chai"
import {RxMongo, RxCollection} from 'rxmongo'
import {MongoClient} from 'mongodb'
import {Rencontres} from '../src/rencontres'

let assert = chai.assert
let expect = chai.expect

chai.should()

describe("Gestion des rencontres", () => {
  describe("Etant donné que la BDD est ouverte", () => {
    let rencontre
    before(() => {
      rencontre = new Rencontres("mongodb://@localhost:27017/baskoredb")
    })
    it("Lit une rencontre", () => {
      rencontre
        .lecture()
        .first()
        .subscribe(rencontre => {
          expect(rencontre).to.exist
        }, err => {
          expect(err).to.not.exist
        })
    })
  })
})
