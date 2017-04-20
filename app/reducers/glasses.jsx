import axios from 'axios'

const defaultState = {
  allGlasses: [],
  selectedGlasses: {}
}


const reducer = (state=defaultState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
  case FETCH_ALL_GLASSES:
    newState.allGlasses = action.allGlasses
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
export const fetchAllGlasses = allGlasses => ({
  type: FETCH_ALL_GLASSES, allGlasses
})

const FETCH_SINGLE_GLASSES = 'FETCH_SINGLE_GLASSES'
export const fetchSingleGlasses = selectedGlasses => ({
  type: FETCH_SINGLE_GLASSES, selectedGlasses
})


export const getGlasses = () =>
  dispatch =>
    axios.get('/api/glasses')
      .then((glasses) => dispatch(fetchAllGlasses(glasses.data)))
      .catch(console.error)

export const getSingleGlasses = (glassesId) =>
  dispatch =>
    axios.get(`/api/glasses/${glassesId}`)
      .then((selectedGlasses) => dispatch(fetchSingleGlasses(selectedGlasses.data)))
      .catch(console.error)

export default reducer
