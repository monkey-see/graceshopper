import { combineReducers } from 'redux'
import {setSeasonReducer} from './seasons'

// JM/SBW - use consistent syntax (change the way bones does it)
const rootReducer = combineReducers({
  auth: require('./auth').default,
  glasses: require('./glasses').default,
  selectedSeason: setSeasonReducer,
  order: require('./orders').default
})

export default rootReducer
