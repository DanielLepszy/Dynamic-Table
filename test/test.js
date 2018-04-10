const app = require("../js/main")

var assert = require('assert');
describe('Tests', function () {
  describe('renderNameLabel tests', function () {

    it('Name and family name available', function () {
      const testDog = {
        name: 'Fluffy',
        familyName: 'von Hohenshlosen',
        race: 'Pitbull',
        age: 23,
        image: 'https://loremflickr.com/320/240/dog',
      };
      const expectedResult = "Fluffy von Hohenshlosen"
      const result = app._test.renderNameLabel(testDog)
      assert.equal(result, expectedResult)
    })

    it('name is undefined', function () {
      const testDog = {
        name: undefined,
        familyName: 'von Hohenshlosen',
        race: 'Pitbull',
        age: 23,
        image: 'https://loremflickr.com/320/240/dog',
      };
      const expectedResult = "von Hohenshlosen"
      const result = app._test.renderNameLabel(testDog)
      assert.equal(result, expectedResult)
    })

    it('name and familyName are null', function () {
      const testDog = {
        name: null,
        familyName: null,
        race: 'Pitbull',
        age: 23,
        image: 'https://loremflickr.com/320/240/dog',
      };
      const expectedResult = ""
      const result = app._test.renderNameLabel(testDog)
      assert.equal(result, expectedResult)
    })

    it('name and familyName is undefined', function () {
      const testDog = {
        name: undefined,
        familyName: undefined,
        race: 'Pitbull',
        age: 23,
        image: 'https://loremflickr.com/320/240/dog',
      };
      const expectedResult = ""
      const result = app._test.renderNameLabel(testDog)
      assert.equal(result, expectedResult)
    })

    it('dog is undefined', function () {
      const expectedResult = ""
      const result = app._test.renderNameLabel(undefined)
      assert.equal(result, expectedResult)
    })
  });
});