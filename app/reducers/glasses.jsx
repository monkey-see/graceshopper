import axios from 'axios'

const defaultState = {
  glasses: [],
  selectedGlasses: {}
}


const reducer = (state=defaultState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
  case FETCH_ALL_GLASSES:
    newState.glasses = action.glasses
    break

  case FETCH_SINGLE_GLASSES:
    newState.selectedGlasses = action.selectedGlasses
    break

  default:
    return state
  }

  return newState
}



const FETCH_ALL_GLASSES = 'FETCH_ALL_GLASSES'
export const fetchAllGlasses = glasses => ({
  type: FETCH_ALL_GLASSES, glasses
})

const FETCH_SINGLE_GLASSES = 'FETCH_SINGLE_GLASSES'
export const fetchSingleGlasses = selectedGlasses => ({
  type: FETCH_SINGLE_GLASSES, selectedGlasses
})

export const getGlasses = () =>
  dispatch =>
    axios.get('/api/glasses')
      .then((glasses) => dispatch(fetchAllGlasses(glasses)))
      .catch(console.error)

export const getSingleGlasses = (glassesId) =>
  dispatch =>
    axios.get(`/api/glasses/${glassesId}`)
      .then((selectedGlasses) => dispatch(fetchSingleGlasses(selectedGlasses)))
      .catch(console.error)

export default reducer
