const MongoClient = require('mongodb').MongoClient
// const assert = require('assert')
const Rencontres = require('../src/Rencontres').Rencontres

describe("Gestion des rencontres", function () {
  it("Lit une rencontre", function (done) {
    const url = "mongodb://@localhost:27017/baskoredb"
    console.log("URL de la base de donnée: " + url)
    MongoClient.connect(url, (err, db) => {
      console.log(`Connecté à la base de donnée: $url`)
      // Rencontres(db).lecture(4) // expect(true).toBe(true)
      expect(err).toBe(null)
      expect(db)
        .not
        .toBe(null)
      db.close()
      done()
    })
  })
})
