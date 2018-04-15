// var {TestScheduler} from "rxjs/Rx";
var chai = require("chai")
var Rx = require("rxjs")
// import {chai} from "chai"
// import {Rx} from "rxjs"

var expect = chai.expect
const op = (somme, arg) => somme + arg;

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
    s$.do(s=>console.log(`s: ${s}.`)).subscribe(s=>expect(s).to.equal(15),null,done());
  })
  it("on peut noter 2", (done) => {
    s$.subscribe(s => {
      expect(s).to.equal(15);
      console.log(`s: ${s}.`)
    }, null, done())
  })
  it("on peut noter 3", () => {
    let scheduler = new Rx.TestScheduler();
    const marbleDonnee   = "-1-1-";
    const donnee$ = scheduler.createHotObservable(marbleDonnee);
    const somme$ = donnee$.reduce(op, 0);
    // scheduler.expectObservable(somme$).toBe("-a-b-", {a:1,b:2});
    scheduler.flush();
  })
})
