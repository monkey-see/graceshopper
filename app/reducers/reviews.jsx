import axios from 'axios'

const FETCH_ALL_REVIEWS = 'FETCH_ALL_REVIEWS'

export const fetchSingleGlassesReviews = allReviews => ({
  type: FETCH_ALL_REVIEWS, allReviews
})


const defaultState = {
  reviews: [],
}

const reducer = (state= [], action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
  case FETCH_ALL_REVIEWS:
    newState.reviews = action.allReviews 
    break

  default:
    return state
  }

  return newState
}


export const getSingleGlassesReviews = (glassesId) =>
  dispatch =>
    axios.get(`/api/reviews/${glassesId}`)
      .then((selectedReviews) => dispatch(fetchSingleGlassesReviews(selectedReviews.data)))
      .catch(console.error)


export default reducer
