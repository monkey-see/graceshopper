import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  glasses: require('./glasses').default
})

export default rootReducer
