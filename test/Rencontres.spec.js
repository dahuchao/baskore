import chai from "chai"
import { RxMongo, RxCollection } from 'rxmongo'
import { MongoClient } from 'mongodb'
import { Rencontres } from '../src/rencontres'

let assert = chai.assert
let expect = chai.expect
chai.should()

describe("Gestion des rencontres délégué", function () {
  let rencontre
  before(() => {
    rencontre = new Rencontres("mongodb://@localhost:27017/baskoredb")
  })
  it("Lit une rencontre", function () {
    rencontre.lecture(2).subscribe(rencontre => {
      expect(rencontre).to.exist
    }, err => {
      expect(err).to.not.exist
    })
  })
})
