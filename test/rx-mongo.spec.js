import chai from "chai"
import { RxMongo, RxCollection } from 'rxmongo'
import { MongoClient } from 'mongodb'

let assert = chai.assert
let expect = chai.expect
chai.should()

describe("Gestion des rencontres", function () {
  before(() => {
    const mongoUrl = "mongodb://@localhost:27017/baskoredb"
    RxMongo.connect(mongoUrl).subscribe(db => {
    }, err => {
      console.log(`Err: ${err}`)
    })
  })
  after(() => {
  })
  it("Lit une rencontre", function () {
    new RxCollection("rencontres")
      .find({})
      .first()
      .subscribe(rencontre => {
        expect(rencontre).to.exist
      }, err => {
        expect(err).to.not.exist
      })
  })
})
