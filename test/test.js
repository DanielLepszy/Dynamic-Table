const app = require("../js/renderDogs.js")

var assert = require('assert');
describe('Tests', function () {
  describe('renderAgeInYearLabel tests', function () {
    it('Age is undefined', function () {

      const result = app._test.renderAgeInYearLabel(undefined)
      assert.equal(result, "")
    })
    it('Age is null', function () {
      const result = app._test.renderAgeInYearLabel(null)
      assert.equal(result, "")
    })

    it('Age is NaN', function () {
      const result = app._test.renderAgeInYearLabel(NaN)
      assert.equal(result, "")
    })
    it('Age is string', function () {
      const result = app._test.renderAgeInYearLabel("string")
      assert.equal(result, "")
    })
    it('Age is number', function () {
      const result = app._test.renderAgeInYearLabel(22)
      assert.equal(result, 1.83)
    })

    it('Age is number', function () {
      const result = app._test.renderAgeInYearLabel(12)
      assert.equal(result, 1)
    })

    it('Age is negative value', function () {
      const result = app._test.renderAgeInYearLabel(-12)
      assert.equal(result, "")
    })

    it('Age is less tnan 1', function () {
      const result = app._test.renderAgeInYearLabel(0.4)
      assert.equal(result, 0.03)
    })

    it('Age is empty object', function () {
      const result = app._test.renderAgeInYearLabel({})
      assert.equal(result, "")
    })
    it('Age is empty object', function () {
      const result = app._test.renderAgeInYearLabel([])
      assert.equal(result, "")
    })
  })

  describe('renderAgeLabel tests', function () {
    it('Age is undefined', function () {

      const result = app._test.renderAgeLabel(undefined)
      assert.equal(result, "")
    })
    it('Age is null', function () {
      const result = app._test.renderAgeLabel(null)
      assert.equal(result, "")
    })

    it('Age is NaN', function () {
      const result = app._test.renderAgeLabel(NaN)
      assert.equal(result, "")
    })
    it('Age is string', function () {
      const result = app._test.renderAgeLabel("string")
      assert.equal(result, "")
    })
    it('Age is number', function () {
      const result = app._test.renderAgeLabel(22)
      assert.equal(result, 22)
    })
  })

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