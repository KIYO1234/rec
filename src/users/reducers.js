import initialState from '../store/initialState'
import { SET_USER_ACTION, DELETE_USER_ACTION, ADD_TO_CART_ACTION, DELETE_FROM_CART_ACTION, FETCH_CART_ACTION } from './actions';

export const usersReducers = (state=initialState, action) => {
    console.log(state)
    switch (action.type) {
        case SET_USER_ACTION:
            console.log('users/reducer.jsのSET_USER_ACTION')
            console.log(action.payload);
            return {
                ...state,
                loginUser: action.payload
            }
    
        case DELETE_USER_ACTION:
            // console.log('loginUserは空になったよ')
            // console.log(action)
            return {
                ...state,
                loginUser: ''
            }
        case ADD_TO_CART_ACTION:
            console.log(state)
            console.log('addToCartAction')
            // console.log(action)
            return {
                ...state, 
                cart: [action.payload]
            }
        case DELETE_FROM_CART_ACTION:
            const newCart = state.cart.filter(item => item.cartId !== action.payload.cartId)
            return {
                ...state, 
                cart: newCart
            }
        case FETCH_CART_ACTION:
            console.log('fetchCartAction')
            console.log(action.type)
            console.log(state)
            console.log(action.payload)
            return {
                ...state, 
                cart: action.payload
            }
    
        default:
            return state
    }
}
