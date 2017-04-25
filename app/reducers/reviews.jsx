import axios from 'axios'

const FETCH_ALL_REVIEWS = 'FETCH_ALL_REVIEWS'
const SET_SINGLE_REVIEWS = 'SET_SINGLE_REVIEWS'

export const fetchSingleGlassesReviews = allReviews => ({
  type: FETCH_ALL_REVIEWS, allReviews
})

export const setSingleGlassesReview = singleReview => ({
  type: SET_SINGLE_REVIEWS, singleReview
})


const defaultState = {
  reviews: [],
  singleReview:{}
}

const reducer = (state= [], action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
  case FETCH_ALL_REVIEWS:
    newState.reviews = action.allReviews 
    break

  case SET_SINGLE_REVIEWS:
	newState.reviews = [...newState.reviews, action.singleReview]
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

export const addSingleGlassesReview = (glassesId, review, rating, userId) =>
  dispatch =>
    axios.post(`/api/reviews/${glassesId}`,{text:review , rating, userId})
      .then((newReview) => dispatch(setSingleGlassesReview(newReview.data)))
      .catch(console.error)


export default reducer
