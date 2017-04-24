import React from 'react'
import {connect} from 'react-redux'

function CheckoutContainer (props) {
  return (
    // is it possible to call totalPrice getterMethod?
    <div>
      <h1>Checkout</h1>
      <ul>
      {
        props.order.glasses && props.order.glasses.map(glasses => {
          return (
            <li key={glasses.id} className="list-group-item">{glasses.name}: ${glasses.price / 100}</li>
          )
        })
      }
      <li className="list-group-item">Total Price: ${props.order.glasses && props.order.glasses.reduce((totalPrice, glasses) => {
        return totalPrice + glasses.price / 100
      }, 0)}</li>
      </ul>
    </div>
  )
}

export default connect(
  function mapStateToProps(state) {
    return {
      order: state.order
    }
  },
  function mapDispatchToProps(dispatch) {
    return {}
  }
)(CheckoutContainer)
