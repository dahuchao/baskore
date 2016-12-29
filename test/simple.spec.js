import chai from "chai"

let assert = chai.assert
let expect = chai.expect
chai.should()

describe("Vrai", function () {
    it("doit etre vrai", function () {
        assert.equal(true, true)
    })
    it("doit etre une chaine", function () {
        let vrai = "vraie"
        vrai
            .should
            .be
            .a("string")
    })
})