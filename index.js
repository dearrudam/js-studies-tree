export const NumberOfChildrenByParentId = (array = [], idAttribute = "id", parentIdAttribute = "parentId", id) => {

    const ids = [id];
    let count = 0;
    array.forEach(item => {
        const founded = ids.
        filter(idx => item[idAttribute] === idx || item[parentIdAttribute] === idx).length;
        if (founded) {
            ids.push(item[idAttribute]);
        }
        count += founded;
    });

    return count ? count - 1 : count;

}

export const NumberOfChildrenByParentIdUsingMapReduce = (array = [], idAttribute = "id", parentIdAttribute = "parentId", id) => {
    const result = array
        .map(item => {
            let result = {};
            if (item[idAttribute]) {
                result[item[idAttribute]] = 1;
            }
            if (item[parentIdAttribute]) {
                result[item[parentIdAttribute]] = 1;
            }
            return result;
        })
        .reduce((acc, act) => {
            for (let field in act) {
                acc[field] += act[field];
            }
            return acc;
        })[id];
    return result ? result : 0;

}