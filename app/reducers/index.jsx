import { combineReducers } from 'redux'
import {setSeasonReducer} from './seasons'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  selectedSeason: setSeasonReducer
})

export default rootReducer
