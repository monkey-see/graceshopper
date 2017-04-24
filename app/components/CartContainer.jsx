import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {updateOrderInDB} from '../reducers/orders'

function CartContainer(props) {

  return (
    <div>
      <h1>Shopping Cart</h1>
      { props.order.glasses && props.order.glasses.map(glasses => {
        return (
          <div key={glasses.id}>
            <h3>{glasses.name}</h3>
            <img src={glasses.image} />
            <h4>Price: ${glasses.price / 100}</h4>
            <button className="btn btn-danger" onClick={() => {
              const newGlasses = []
              props.order.glasses.forEach(singleGlasses => {
                if (glasses.id !== singleGlasses.id) newGlasses.push(singleGlasses.id)
              })
              props.removeGlassesFromOrder(props.order.id, newGlasses)
            }} >Delete</button>
            <hr />
          </div>
        )
      })
    }
    <Link to='/checkout'><button className="btn btn-success">Checkout</button></Link>
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
      removeGlassesFromOrder: (orderId, glassesIdArr) => {
        dispatch(updateOrderInDB(orderId, glassesIdArr))
      }
    }
  }
)(CartContainer)
