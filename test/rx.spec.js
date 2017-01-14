import Rx from "rxjs"
import chai from "chai"

let assert = chai.assert
let expect = chai.expect
let should = chai.should()

describe("Etant donné 4 éléments", () => {
  let ele$
  before(done => {
    ele$ = Rx.Observable.from([1, 2, 3, 4])
    ele$.subscribe(ele => {
      console.log(`Element: ${ele}`)
    }, (e) => console.log(e), done())
  })
  describe("lorsque j'ajoute un élément", () => {
    before(done => {
      ele$ = ele$.concat(Rx.Observable.of(5))
      done()
    })
    it("je veux que le nombre d element soit de 5", done => {
      ele$.count().subscribe(nb => {
        console.log(`nb élement: ${nb}`)
        assert.equal(5, nb)
      }, (e) => console.log(e), done())
    })
  })
  describe("lorsque je supprime un élément", () => {
    let ele$ = Rx.Observable.from([1, 2, 3, 4])
    before(() => {
      ele$ = ele$.filter(ele => {
        console.log(`élement: ${ele}`)
        if (ele == 4) {
          console.log(`élément supprime`)
          return false
        }
        else {
          console.log(`élément ajouter`)
          return true
        }
      })
    })
    it("je veux que le nombre d element soit de 4", done => {
      ele$.count().subscribe(nb => {
        console.log(`nb élement: ${nb}`)
        chai.expect(3).to.equal(4)
      }, (e) => console.log(e), done())
    })
  })
})
