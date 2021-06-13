
export const SET_USER_ACTION = 'SET_USER_ACTION'
export const setUserAction = user => ({
    type: SET_USER_ACTION,
    payload: user,
})

export const DELETE_USER_ACTION = 'DELETE_USER_ACTION'
export const deleteUserAction = () => ({
    type: DELETE_USER_ACTION,
})

export const ADD_TO_CART_ACTION = 'ADD_TO_CART_ACTION'
export const addToCartAction = item => ({
    type: ADD_TO_CART_ACTION,
    payload: item
}) 

export const DELETE_FROM_CART_ACTION = 'DELETE_FROM_CART_ACTION'
export const deleteFromCartAction = item => ({
    type: DELETE_FROM_CART_ACTION,
    payload: item
}) 

export const FETCH_CART_ACTION = 'FETCH_CART_ACTION'
export const fetchCartAction = cartFromFB => ({
    type: FETCH_CART_ACTION,
    payload: cartFromFB
})