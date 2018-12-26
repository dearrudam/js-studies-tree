import * as funcs from './index'

for (const fn in funcs) {
  const func = funcs[fn]
  if (typeof func === 'function') {
    describe(`Testing ${func.name} function`, () => {
      const objectArray = [
        { id: 0, parentId: null },
        { id: 4, parentId: 3 },
        { id: 1, parentId: 0 },
        { id: 3, parentId: 2 },
        { id: 2, parentId: 0 }
      ]

      const scenarios = [
        {
          items: objectArray,
          givenId: 0,
          expectedValue: 4
        },
        {
          items: objectArray,
          givenId: 1,
          expectedValue: 0
        },
        {
          items: objectArray,
          givenId: 2,
          expectedValue: 2
        },
        {
          items: objectArray,
          givenId: 3,
          expectedValue: 1
        },
        {
          items: objectArray,
          givenId: 4,
          expectedValue: 0
        },
        {
          items: [],
          givenId: 1,
          expectedValue: 0
        },
        {
          items: null,
          givenId: 1,
          expectedValue: 0
        },
        {
          items: null,
          givenId: null,
          expectedValue: 0
        }
      ]

      scenarios.forEach(scenario => {
        it(`Given the array:\n\t${JSON.stringify(
          scenario.items
        )}\n\tCase it's passed '${
          scenario.givenId
        }' as parent id then the number of children should be equals to ${
          scenario.expectedValue
        }`, () => {
          expect(func(scenario.items, scenario.givenId)).toBe(
            scenario.expectedValue
          )
        })
      })
    })
  }
}
