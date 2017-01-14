import Immutable from "immutable"
import chai from "chai"

let assert = chai.assert
let expect = chai.expect
let should = chai.should()

describe("A suite", function () {
  let rencontre = {
    id: 2,
    nom: "Nom de test",
    montant: 1000
  }
  it("Montant mis à jour", function () {
    let rencontreModifiee = Immutable
      .fromJS(rencontre)
      .set("montant", 200)
    expect(rencontre.montant).toBe(1000)
    expect(rencontreModifiee.get("montant")).toBe(200)
    rencontreObj = rencontreModifiee.toObject()
    expect(rencontreObj.montant).toBe(200)
  })
  it("Modification d'identifiant", function () {
    console.log("rencontre: " + JSON.stringify(rencontre))
    let rencontreModifiee = ajouterDate(rencontre)
    console.log("rencontreModifiee: " + JSON.stringify(rencontreModifiee))
  })
  it("Liste à l'envers", function () {
    let liste = Immutable.List(["1", "2", "3", "4"])
    console.log("liste: " + JSON.stringify(liste))
    liste.map(num => {
      console.log("liste à l'envers: " + JSON.stringify(liste.reverse()))
    })
  })
})

function ajouterDate(rencontre) {
  return Immutable
    .fromJS(rencontre)
    .set("id", 99999)
    .toObject()
}
