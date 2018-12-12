/**
 * Returns the number of direct and indirect children from a given array of objects regarding to a given parent id
 * 
 * @param {Array<{id:number;parendId:number}>} items 
 * @param {number} parentId 
 * @returns {number}
 */
export function NumberOfChildrenByParentId(items, parentId) {

    // checking if items is valid array 
    if (!Array.isArray(items))
        return 0;

    // getting the direct children  
    const directChildren = items.filter(item => item['parentId'] === parentId);

    if (!directChildren.length) {
        // returns zero if there is no direct children. Right here any recursive invocation is stopped.
        return 0;
    }

    return directChildren.length +
        directChildren
        // getting the number of indirect children for each direct children. Right here starts a recursive invocation
        .map(currentItem => NumberOfChildrenByParentId(items, currentItem['id']))
        // accounting the numbers of indirect children discovered with the direct children number
        .reduce((acc, val) => acc + val);

}