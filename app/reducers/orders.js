import axios from 'axios'

const FIND_OR_CREATE_ORDER = 'FIND_OR_CREATE_ORDER'
const UPDATE_ORDER = 'UPDATE_ORDER'

// sync action creators

export const createOrder = order => ({
  type: FIND_OR_CREATE_ORDER,
  order
})

export const updateOrder = order => ({
  type: UPDATE_ORDER,
  order
})

// async action creators

export const createOrderInDB = () => dispatch => {
  axios.post(`/api/orders/`)
    .then(order => order.data)
    .then(order => dispatch(createOrder(order)))
    .catch(console.error)
}

export const updateOrderInDB = (id, glassesIdArr) => dispatch => {
  axios.put(`/api/orders/${id}`, {glasses: glassesIdArr})
    .then(order => order.data)
    .then(order => dispatch(updateOrder(order)))
    .catch(console.error)
}

export const processOrder = (id, status) => dispatch => {
  axios.put(`/api/orders/${id}`, {status: status})
    .then(() => dispatch(updateOrder({})))
    .catch(console.error)
}

// reducer

const setOrderReducer = (state = {}, action) => {
  switch (action.type) {
  case FIND_OR_CREATE_ORDER:
    return action.order
  case UPDATE_ORDER:
    return action.order
  default:
    return state
  }
}

export default setOrderReducer
