import chai from "chai"

let assert = chai.assert
let expect = chai.expect
chai.should()

describe("Tests avec mocha-chai", function () {
    it("La vérité véritable", function () {
        assert.equal(true, true)
    })
    it("Test d'une chaine de caractère", function () {
        let vrai = "vraie"
        vrai
            .should
            .be
            .a("string")
    })
})