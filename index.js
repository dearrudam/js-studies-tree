export function NumberOfChildrenByParentId(items, parentId) {

    if (!items)
        return 0;

    const filteredArray = items.filter(item => item['parentId'] === parentId);

    if (!filteredArray.length)
        return 0;

    return filteredArray.length +
        filteredArray.map(currentItem => {
            return NumberOfChildrenByParentId(items, currentItem['id']);
        }).reduce((acc, val) => acc + val);

}