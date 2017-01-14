import chai from "chai"
import Repartiteur from "../../src/rencontres/rencontres-repartiteur"
import * as types from "../../src/rencontres/rencontres-actions"

let assert = chai.assert
let expect = chai.expect
let should = chai.should()

describe("Etant donné que le répartiteur est initialisé", () => {
  let {etat$, action$} = Repartiteur()
  it("alors l'état est disponible", () => {
    expect(etat$).to.exist
  })
  it("alors la source des actions est disponible", () => {
    expect(action$).to.exist
  })
  it("alors la liste des rencontres est vide", () => {
    etat$.subscribe(etat => {
      let rencontres = etat.rencontres
      assert.isNotNull(rencontres, "L'état n'est pas bien initialisé")
      expect(rencontres).to.be.empty
      rencontres
        .should
        .have
        .lengthOf(0)
    })
  })
})
describe("lorsque le mode ajout est demandé", () => {
  let {etat$, action$} = Repartiteur()
  before(() => {
    action$.next({type: types.AJOUTER_RENCONTRE})
  })
  it("alors le mode ajout doit être actif", () => {
    etat$.subscribe(etat => {
      should.exist(etat.modeAjout)
      etat.modeAjout.should.to.be.true
    })
  })
})
describe("lorsqu'une rencontre est ajoutée", () => {
  let {etat$, action$} = Repartiteur()
  before(() => {
    action$.next({
      type: types.POST_RENCONTRE_SUCCESS,
      rencontre: {
        id: 1,
        date: new Date(),
        hote: {
          nom: "host-test",
          marque: 0
        },
        visiteur: {
          nom: "visiteur-test",
          marque: 0
        }
      }
    })
  })
  it("alors le nombre de rencontre est de 1", () => {
    etat$.subscribe(etat => {
      etat
        .rencontres
        .should
        .have
        .lengthOf(1)
    })
  })
  it("alors le mode ajout est désactivé", () => {
    etat$.subscribe(etat => {
      etat.modeAjout.should.to.be.false
    })
  })
})
describe("etant donné qu une rencontre est enregistrée", () => {
  let {etat$, action$} = Repartiteur()
  before(() => {
    action$.next({
      type: types.POST_RENCONTRE_SUCCESS,
      rencontre: {
        id: 2,
        date: new Date(),
        hote: {
          nom: "host-test",
          marque: 0
        },
        visiteur: {
          nom: "visiteur-test",
          marque: 0
        }
      }
    })
  })
  describe("lorsque qu'une rencontre est supprimée", () => {
    before(() => {
      action$.next({type: types.DELETE_RENCONTRE_SUCCESS, idRencontre: 2})
    })
    it("alors plus aucune rencontre n'est enregistrée", () => {
      etat$.subscribe(etat => {
        console.log("Test: " + JSON.stringify(etat))
        etat
          .rencontres
          .should
          .have
          .lengthOf(0)
      })
    })
  })
})
