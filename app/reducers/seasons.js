import axios from 'axios'

const SET_SEASON = 'SET_SEASON'

// sync action creators

export const setSeason = season => ({
  type: SET_SEASON,
  selectedSeason: season
})

// reducer

export const setSeasonReducer = (state = '', action) => {
  switch (action.type) {
  case SET_SEASON:
    return action.selectedSeason
  default:
    return state
  }
}

