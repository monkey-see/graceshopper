import axios from 'axios'

const FETCH_ALL_GLASSES = 'FETCH_ALL_GLASSES'
const FETCH_SINGLE_GLASSES = 'FETCH_SINGLE_GLASSES'
const FETCH_SEARCH_GLASSES = 'FETCH_SEARCH_GLASSES'

const defaultState = {
  allGlasses: [],
  selectedGlasses: {},
  searchResultGlasses: []
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

  case FETCH_SEARCH_GLASSES:
    newState.searchResultGlasses = action.searchResultGlasses
    break

  default:
    return state
  }

  return newState
}

export const fetchAllGlasses = allGlasses => ({
  type: FETCH_ALL_GLASSES, allGlasses
})

export const fetchSingleGlasses = selectedGlasses => ({
  type: FETCH_SINGLE_GLASSES, selectedGlasses
})

export const fetchSearchGlasses = searchResultGlasses => ({
  type: FETCH_SEARCH_GLASSES, searchResultGlasses
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

export const getSearchGlasses = (searchName, searchColor, searchMaterial) =>
  dispatch =>{
    let uri = `/api/glasses?${searchName ? 'name='+searchName : ''}&${searchColor ? 'color='+searchColor : ''}&${searchMaterial ? 'material='+searchMaterial : ''}`
    axios.get(uri)
        .then((glasses) => dispatch(fetchSearchGlasses(glasses.data)))
        .catch(console.error)
    }

export default reducer
