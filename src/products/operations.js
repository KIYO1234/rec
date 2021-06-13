
import {searchItemsAction, setItemsAction} from './actions'
import axios from 'axios'
import firebase from 'firebase'

// actionsではなく、dispatch()を返したい
export const searchItem = e => {
    console.log(e)
    return async (dispatch) => {
        await firebase.firestore().collection('items').get().then(snapshot => {
            snapshot.forEach(doc => firebase.firestore().doc(`items/${doc.id}`).delete())
        })
        console.log(dispatch)
        axios.get('https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706?', {
            params: {
                applicationId: '1002332757402892625',
                keyword: e
            }
        }).then(res => { 
            let items = res.data.Items
            console.log(items)

            // items.forEach(item => {
            //     // firebase.firestore().collection('items').get().then(snapshot => snapshot.forEach(doc => firebase.firestore().doc(`items/${doc.id}`).update(item)))
            //     // firebase.firestore().collection('items').add(item)
            // })
            items.forEach(item => {
                firebase.firestore().collection('items').add(item)
            })
            dispatch(searchItemsAction(items))
        })
        console.log('operations')
    }
}

export const setItems = () => {
    console.log('setItemsがきたよ');
    return async dispatch => {
        let itemsInFirebase = []
        await firebase.firestore().collection('items').get().then(
            snapshot => snapshot.forEach(doc => itemsInFirebase.push(doc.data())))
        console.log(itemsInFirebase)
        dispatch(setItemsAction(itemsInFirebase))
    }
}
