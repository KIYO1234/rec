import initialState from '../store/initialState'

import {SEARCH_ITEMS_ACTION, SETITEM, SET_ITEMS_ACTION} from './actions'

export const productsReducers = (state = initialState, action) => {
    // console.log(state)
    switch(action.type){
        case SEARCH_ITEMS_ACTION:
            // console.log(action)
            // console.log(state)
            return{
                ...state,
                items : action.items
            }
        case SETITEM:
            // console.log(action)
            return{
                ...state,
                selectedItem: action.selectedItem
            }
        case SET_ITEMS_ACTION:            
            console.log('set_items_actionがきたよ')
            console.log(action.payload)
            console.log(state);
            return{
                ...state,
                items: action.payload
            }
        default: 
            return state
    }
}