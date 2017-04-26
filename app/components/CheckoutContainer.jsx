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
    <div className="col-xs-12" >
      <h1 style={{color: '#3d5c5c', marginLeft: '35px'}}>Checkout</h1>
      <div className="row col-xs-12">
        <ul className="col-xs-6 center" style={{margin: '0 auto', marginLeft: '20px'}}>
        {
          props.order.glasses && props.order.glasses.map(glasses => (
              <li key={glasses.id} className="list-group-item">{glasses.name}: ${glasses.price / 100}</li>
            )
          )
        }
        <li className="list-group-item">Total Price: ${props.order.glasses && props.order.glasses.reduce((totalPrice, glasses) => totalPrice + glasses.price / 100, 10.94)}</li>
        </ul>
      </div>
      <hr />
      <form className="form-group row" style={{marginLeft: '20px'}} onSubmit={completeOrder}>
        <div className="col-xs-6">
          <h5>Personal Info</h5>
          <input className="form-control" placeholder="First Name" name="first-name" />
          <input className="form-control" placeholder="Last Name" name="last-name" />
          <input className="form-control" placeholder="Phone Number" name="phone-number" />
          <input className="form-control" placeholder="Email" name="email" />
        </div>
        <div className="col-xs-6">
          <h5>Shipping Address</h5>
          <input className="form-control" placeholder="Address Line 1" name="address-line-1" />
          <input className="form-control" placeholder="Address Line 2" name="address-line-2" />
          <input className="form-control" placeholder="City" name="city" />
          <input className="form-control" placeholder="State" name="state" />
          <input className="form-control" placeholder="ZIP Code" name="zip-code" />
        </div>
        <div className="col-xs-6">
          <h5>Credit Card Info</h5>
          <input className="form-control" placeholder="Credit Card Number" name="credit-card-number" />
          <input className="form-control" placeholder="CCV" name="ccv" />
          <input className="form-control" placeholder="Expiration Date" name="expiration-date" />
        </div>
        <div className="col-xs-6">
          <h5>Billing Address</h5>
          <input className="form-control" placeholder="Address Line 1" name="address-line-1" />
          <input className="form-control" placeholder="Address Line 2" name="address-line-2" />
          <input className="form-control" placeholder="City" name="city" />
          <input className="form-control" placeholder="State" name="state" />
          <input className="form-control" placeholder="ZIP Code" name="zip-code" />
        </div>
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
