import { combineReducers } from 'redux'
import {setSeasonReducer} from './seasons'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  glasses: require('./glasses').default,
  selectedSeason: setSeasonReducer,
  order: require('./orders').default,
  reviews: require('./reviews').default
})

export default rootReducer
