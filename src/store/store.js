import { createStore, applyMiddleware } from 'redux'
import {combineReducers} from 'redux'
import {productsReducers} from '../products/reducers'
import {usersReducers} from '../users/reducers'
import thunk from 'redux-thunk'


const reducers = combineReducers({productsReducers, usersReducers})

export const store = createStore(reducers, applyMiddleware(thunk))



