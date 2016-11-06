import chai from "chai"
import store from '../src/store'
import * as types from "../src/actions/actions-types"

let assert = chai.assert
let expect = chai.expect
let should = chai.should()

describe("Etant donné que le Store créé", () => {
    it("alors l'état doit être initialise", () => {
        let etat = store
            .getState()
            .rencontreState
        assert.isNotNull(etat, "L'état n'est pas bien initialisé")
    })
    it("alors la liste des rencontres est vide", () => {
        let rencontres = store
            .getState()
            .rencontreState
            .rencontres
        assert.isNotNull(rencontres, "L'état n'est pas bien initialisé")
        expect(rencontres).to.be.empty
        rencontres
            .should
            .have
            .lengthOf(0)
    })
    describe("Lorsque le mode ajout est demandé", () => {
        before(() => {
            store.dispatch({type: types.AJOUTER_RENCONTRE})
        })
        it("alors le mode ajout doit être actif", () => {
            let etat = store
                .getState()
                .rencontreState
            console.log("*****" + etat)
            should.exist(etat.modeAjout)
            etat.modeAjout.should.to.be.true
        })
        describe("Lorsqu'une rencontre est ajoutée", () => {
            before(() => {
                store.dispatch({
                    type: types.POST_RENCONTRE_SUCCESS,
                    rencontre: {
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
                let etat = store
                    .getState()
                    .rencontreState
                etat
                    .rencontres
                    .should
                    .have
                    .lengthOf(1)
            })
            it("alors le mode ajout est désactivé", () => {
                let etat = store
                    .getState()
                    .rencontreState
                etat.modeAjout.should.to.be.false
            })
        })
    })
})