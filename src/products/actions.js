
export const SEARCH_ITEMS_ACTION = 'SERACH_ITEMS_ACTION'
export const searchItemsAction = (items) => ({
    type: SEARCH_ITEMS_ACTION,
    items: items,
})

export const SETITEM = 'setItem'
export const setItem = item => ({
    type: SETITEM, 
    selectedItem: item,
})

export const SET_ITEMS_ACTION = 'SET_ITEMS_ACTION'
export const setItemsAction = itemsInFirebase => ({
    type: SET_ITEMS_ACTION,
    payload: itemsInFirebase
})