import Rx from "rxjs"
import chai from "chai"

let assert = chai.assert
let expect = chai.expect
let should = chai.should()

describe("Test de chai par chai", function () {
    it("doit etre vrai", function () {
        assert.equal(true, true)
    })
    it("doit etre une chaine", function (done) {
        Rx.Observable.from([1, 2, 3, 4]).count().subscribe(nb => {
            assert.equal(true, false)
            console.log(`nb élement: ${nb}`)
        }, (e) => console.log(e), done())
    })
})

