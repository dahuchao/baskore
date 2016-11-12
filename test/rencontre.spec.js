import chai from "chai"
import React from 'react';
import {mount, shallow} from 'enzyme';
import Rencontres from "../src/composants/rencontres"

let assert = chai.assert
let expect = chai.expect
chai.should()

describe("Tests avec mocha-chai", function () {
  it("La vérité véritable", function () {
    expect(mount(<Rencontres/>).find('.flottant').length)
      .to
      .equal(1);
  })
  it("Test d'une chaine de caractère", function () {
    let vrai = "vraie"
    vrai
      .should
      .be
      .a("string")
  })
})