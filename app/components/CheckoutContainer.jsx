import React from 'react'
import {connect} from 'react-redux'

function CheckoutContainer (props) {
  return (
    // is it possible to call totalPrice getterMethod?
    <div>{props.order.totalPrice()}</div>
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
