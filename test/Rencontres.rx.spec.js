var chai = require("chai")
var Rx = require("rxjs")

var expect = chai.expect
var should = chai.should()

describe("Gestion des rencontres", () => {
  let nb$
  let s$
  before(done => {
    nb$ = Rx
      .Observable
      .of(1)
    s$ = nb$.reduce((s, nb) => s + nb, 14)
    done()
  })
  it("on peut noter 1", (done) => {
    s$.subscribe(s => {
      console.log(`s: ${s}.`)
      done()
    })
  })
  it("on peut noter 2", (done) => {
    s$.subscribe(s => {
      console.log(`s: ${s}.`)
      done()
    })
  })
})
