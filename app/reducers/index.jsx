import { combineReducers } from 'redux'
import authReducer from './auth'
import glassesReducer from './glasses'
import seasonReducer from './seasons'
import orderReducer from './orders'
import reviewReducer from './reviews'

const rootReducer = combineReducers({
  auth: authReducer,
  glasses: glassesReducer,
  selectedSeason: seasonReducer,
  order: orderReducer,
  reviews: reviewReducer
})

export default rootReducer
