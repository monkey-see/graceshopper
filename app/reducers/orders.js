import axios from 'axios'

const FETCH_ORDER = 'FETCH_ORDER'
const ADD_GLASSES_TO_CART = 'ADD_GLASSES_TO_CART'
const REMOVE_GLASSES_FROM_CART = 'REMOVE_GLASSES_FROM_CART'


// sync action creators

export const fetchOrder = currentOrder => ({
  type: FETCH_ORDER,
  currentOrder
})



// async action creators

export const getOrder = (id) => dispatch => {
  axios.get(`/api/orders/${id}`)
    .then(currentOrder => currentOrder.data)
    .then(currentOrder => dispatch(fetchOrder(currentOrder)))
    .catch(console.error)
}

// reducer

export const setOrderReducer = (state = {}, action) => {
  switch (action.type) {
  case FETCH_ORDER:
    return action.currentOrder
  default:
    return state
  }
}
