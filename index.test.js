import {
    NumberOfChildrenByParentId
} from "./index"

describe(`Testing ${NumberOfChildrenByParentId.name} function`, () => {


    const arrayValue = `[
        { "id": 0, "parentId": null},
        { "id": 4, "parentId": 3},
        { "id": 1, "parentId": 0},
        { "id": 3, "parentId": 2},
        { "id": 2, "parentId": 0}
    ]`;

    const arrayObject = JSON.parse(arrayValue);

    const scenarios = [{
            "items": arrayObject,
            "givenId": 3,
            "expectedValue": 1
        },
        {

            "items": arrayObject,
            "givenId": 0,
            "expectedValue": 4
        },
        {

            "items": arrayObject,
            "givenId": 2,
            "expectedValue": 2
        },
        {

            "items": arrayObject,
            "givenId": 1,
            "expectedValue": 0
        },
        {

            "items": arrayObject,
            "givenId": 4,
            "expectedValue": 0
        },
        {

            "items": [],
            "givenId": 1,
            "expectedValue": 0
        },
        {

            "items": null,
            "givenId": 2,
            "expectedValue": 0
        },
        {

            "items": null,
            "givenId": null,
            "expectedValue": 0
        }

    ];

    scenarios.forEach(scenario => {
        it(`For the array:\n\t${JSON.stringify(scenario.items)}\n\tGiven '${scenario.givenId}' as id then the number of children should be ${scenario.expectedValue}`, () => {
            expect(NumberOfChildrenByParentId(scenario.items, scenario.givenId)).toBe(scenario.expectedValue);
        });
    });

});