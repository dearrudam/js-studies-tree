/**
 * Returns the number of direct and indirect children from a given array of objects regarding a given parent id
 *
 * @param {Array<{id:number;parendId:number}>} items
 * @param {number} parentId
 * @returns {number}
 */
export function NumberOfChildrenByParentId(items, parentId) {
  const tree = createTree(items) // building the tree
  const directChildren = tree[parentId] ? tree[parentId] : [] // getting from the tree the direct children for a given parent id
  return directChildren.length + childrenCountOf(tree, directChildren) // accumulating the direct children count with its children count
}

/**
 * Creates a tree based on a given array of items
 *
 * @param {Array<{id:number;parendId:number}>} items
 * @returns {{[key: string]:Array<{id:number;parendId:number}>}}
 */
function createTree(items) {
  const tree = {} // a tree that represents a mapping of all items and its children
  
  if (!Array.isArray(items)) return tree // checking if items is valid array
  
  // mapping all items and its children
  items.forEach(item => {
    if (item['id'] != null) {
      const key = `${item['id']}` // creating a const var in order to keep the current id
      // avoiding objects without a valid 'id' attribute
      if (!tree[key]) {
        // checking if the current id is mapped already
        tree[key] = [] // mapping the current id to an empty array of children
      }
    }
    if (item['id'] != item['parentId']) {
      // ignoring possible cyclic references
      if (item['parentId'] != null) {
        // ignoring objects with invalid 'parentId' attribute
        const key = `${item['parentId']}` // creating a const var in order to keep the current parent id
        if (tree[key]) {
          // checking if there is an array already mapped for the current parent id
          tree[key].push(item) // adding the current item to the parent id array
        } else {
          tree[key] = [item] // mapping the current item to a new array to a given parent id that wasn't mapped yet
        }
      }
    }
  })
  return tree
}

/**
 * Counts the number of children for a given item array
 *
 * @param {{[key: string]:Array<{id:number;parendId:number}>}} tree
 * @param {Array<{id:number;parendId:number}>} items
 * @returns {number}
 */
function childrenCountOf(tree, items) {
  let count = 0
  // iterating between items and counting their children
  items.forEach(item => {
    const key = `${item['id']}`; // creating a const var in order to keep the current item id
    const directChildren = tree[key] ? tree[key] : [] // getting the direct children from the current item
    count += directChildren.length + childrenCountOf(tree, directChildren) // accumulating the direct children count with its children count
  })
  return count
}
