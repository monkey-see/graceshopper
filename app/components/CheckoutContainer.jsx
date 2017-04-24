import React from 'react'
import {connect} from 'react-redux'
import {processOrder} from 'APP/app/reducers/orders'
import {browserHistory} from 'react-router'

function CheckoutContainer(props) {
  function completeOrder(event) {
    event.preventDefault()
    props.processOrder(props.order.id, 'processing')
    browserHistory.push('/success')
  }
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
      <hr />
      <form className="form-group col-lg-3" onSubmit={completeOrder}>
        <h5>Personal Info</h5>
        <input className="form-control" placeholder="First Name" name="first-name" />
        <input className="form-control" placeholder="Last Name" name="last-name" />
        <input className="form-control" placeholder="Phone Number" name="phone-number" />
        <h5>Shipping Address</h5>
        <input className="form-control" placeholder="Address Line 1" name="address-line-1" />
        <input className="form-control" placeholder="Address Line 2" name="address-line-2" />
        <input className="form-control" placeholder="City" name="city" />
        <input className="form-control" placeholder="State" name="state" />
        <input className="form-control" placeholder="ZIP Code" name="zip-code" />
        <h5>Billing Address</h5>
        <input className="form-control" placeholder="Address Line 1" name="address-line-1" />
        <input className="form-control" placeholder="Address Line 2" name="address-line-2" />
        <input className="form-control" placeholder="City" name="city" />
        <input className="form-control" placeholder="State" name="state" />
        <input className="form-control" placeholder="ZIP Code" name="zip-code" />
        <h5>Credit Card Info</h5>
        <input className="form-control" placeholder="Credit Card Number" name="credit-card-number" />
        <input className="form-control" placeholder="CCV" name="ccv" />
        <hr />
        <input className="btn btn-primary" type="submit" value="Pay Now" />
      </form>
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
    return {
      processOrder: (orderId, status) => {
        dispatch(processOrder(orderId, status))
      }
    }
  }
)(CheckoutContainer)
