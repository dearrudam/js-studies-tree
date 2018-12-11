import {
    NumberOfChildrenByParentId,
    NumberOfChildrenByParentIdUsingMapReduce
} from "./index"

const arrayValue = `[
    { "id": 0, "parentId": null},
    { "id": 4, "parentId": 3},
    { "id": 1, "parentId": 0},
    { "id": 3, "parentId": 2},
    { "id": 2, "parentId": 0}
]`;

const idAttribute = "id";

const parentIdAttribute = "parentId";

const array = JSON.parse(arrayValue);

function testFunction(func) {
    describe(`Testing ${func.name} function`, () => {

        const scenarios = [{
                "givenId": 3,
                "expectedValue": 1
            },
            {
                "givenId": 0,
                "expectedValue": 4
            }
        ];

        scenarios.forEach(scenario => {
            it(`Given '${scenario.givenId}' as id then the number of children should be ${scenario.expectedValue}`, () => {
                expect(func(array, idAttribute, parentIdAttribute, scenario.givenId)).toBe(scenario.expectedValue);
            });
        });

    });
}

testFunction(NumberOfChildrenByParentId);

testFunction(NumberOfChildrenByParentIdUsingMapReduce);