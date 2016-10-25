let Immutable = require('immutable')

describe("A suite", function () {
  let rencontre = { id: 2, nom: "Nom de test", montant: 1000 }
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
})

function ajouterDate(rencontre) {
  return Immutable
    .fromJS(rencontre)
    .set("id", 99999)
    .toObject()
}
