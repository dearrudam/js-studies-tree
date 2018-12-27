/**
 * Returns the number of direct and indirect children from a given array of objects regarding a given parent id
 *
 * @param {Array<{id:number;parendId:number}>} items
 * @param {number} parentId
 * @returns {number}
 */
export function NumberOfChildrenByParentId(items, parentId) {
  // checking if items is valid array
  if (!Array.isArray(items)) return 0

  // getting the direct children
  const directChildren = items.filter(item => item['parentId'] === parentId)

  if (!directChildren.length) {
    // returns zero if there is no direct children. Right here any recursive invocation is stopped.
    return 0
  }

  return (
    directChildren.length +
    directChildren
    // getting the number of indirect children for each direct children. Right here starts a recursive invocation
    .map(currentItem => NumberOfChildrenByParentId(items, currentItem['id']))
    // accounting the numbers of indirect children discovered with the direct children number
    .reduce((acc, val) => acc + val)
  )
}



/**
 * Returns the number of direct and indirect children from a given array of objects regarding a given parent id
 *
 * @param {Array<{id:number;parendId:number}>} items
 * @param {number} parentId
 * @returns {number}
 */
export function NumberOfChildrenByParentId2(items, parentId) {
  // checking if items is valid array
  if (!Array.isArray(items)) return 0

  // object instance that represents a mapping of all items and its children
  const map = {}
  // flag to mark if it shoulds compute
  let shouldCompute = false

  // mapping all items and its children
  items.forEach(item => {
    if (item['id'] != null) { // avoiding objects without a valid 'id' attribute
      if (!map[item['id']]) { // checking if the current id is mapped already 
        map[item['id']] = [] // mapping the current id to an empty array of children
      }
    }

    if (item['id'] != item['parentId']) { // ignoring possible cyclic references
      if (item['parentId'] != null) { // ignoring objects with invalid 'parentId' attribute
        if (!shouldCompute) { // once it's checked, do nothing 
          shouldCompute = parentId === item['parentId'] // checking if it's should compute
        }
        const key = `${item['parentId']}` // creating a const var in order to keep the current parent id 
        if (map[key]) { // checking if there is an array already mapped for the current parent id
          map[key].push(item) // adding the current item to the parent id array
        } else {
          map[key] = [item] // mapping the current item to a new array to a given parent id that wasn't mapped yet
        }
      }
    }
  })

  // internal function used just for count the mapped items with their children for a given item array
  function recursiveCount(map, items) {
    let count = 0
    items.forEach(item => {
      if (map[item['id']]) {
        count += map[item['id']].length + recursiveCount(map, map[item['id']])
      }
    })
    return count
  }
  console.log(map)

  let count = 0 // variable that stores the whole children count

  if (shouldCompute) { // checking it it's needed to compute
    // accumulating the direct children count with its children count
    count += map[parentId].length + recursiveCount(map, map[parentId])
  }

  return count
}