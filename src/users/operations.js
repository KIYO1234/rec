import firebase from 'firebase'
import { setUserAction, deleteUserAction, addToCartAction, fetchCartAction, deleteFromCartAction } from './actions'

export const signIn = () => {
    console.log('signInが実行されました')
    return async dispatch => {
        console.log(dispatch)
        const google_auth_provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(google_auth_provider);
    }
}

export const setUser = () => {
    console.log('setUserです')
    return async dispatch => {
        firebase.auth().onAuthStateChanged(user => {
            console.log('onAuthStateChanged')
            if(user) {
                console.log('users/operationsのsetUser')
                dispatch(setUserAction(user))
            }
        })
    }
}

export const signOut = () => {
    return async dispatch => {
        firebase.auth().signOut()
        console.log('signout')
        dispatch(deleteUserAction())
    }
}

export const addToCart = item =>  (dispatch, getState) => {
    console.log(getState().usersReducers)
    // console.log(getState().usersReducers.loginUser.uid)
    const uid = getState().usersReducers.loginUser.uid
    firebase.firestore().collection(`users/${uid}/cart`).add(item)
    dispatch(addToCartAction(item))
}

export const deleteFromCart = item => {
    console.log('users/operactionsのdeleteFromCart')
    console.log(item)
    return async (dispatch, getState) => {
        const uid =  getState().usersReducers.loginUser.uid
        console.log(uid)
        await firebase.firestore().doc(`users/${uid}/cart/${item.cartId}`).delete()
        dispatch(deleteFromCartAction(item))
    }
}

export const fetchCart = () =>  {
    console.log('fetchCart')
    return async (dispatch, getState) => {
        // dispatch(setUser())
        // console.log(getState());        
        const uid =  getState().usersReducers.loginUser.uid
        console.log(uid)
        const cartFromFB = []
        await firebase.firestore().collection(`users/${uid}/cart`).get().then(snapshot => {
            console.log('firebaseにはアクセスできてるぜ')
            snapshot.forEach(doc => cartFromFB.push({...doc.data() , cartId: doc.id}))
            console.log(cartFromFB)
            dispatch(fetchCartAction(cartFromFB))
        })
    }
}