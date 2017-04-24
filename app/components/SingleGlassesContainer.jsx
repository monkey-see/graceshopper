import React from 'react'
import {connect} from 'react-redux'
import {updateOrderInDB} from '../reducers/orders'

function SingleGlasses(props) {
  // JM/SBW - object destructuring is cool
  return (
    <div>
      <h1>{props.selectedGlasses.name}</h1>
      <img src={props.selectedGlasses.image} />
      <h3>{props.selectedGlasses.color}</h3>
      <h3>{props.selectedGlasses.material}</h3>
      <h3>{props.selectedGlasses.price}</h3>
      <h3>{props.selectedGlasses.description}</h3>
      <h3>{props.selectedGlasses.quantity}</h3>
      {/* can only add 1 pair of the same glasses at a time, to be fixed later */}
      <button className="btn btn-success" onClick={() => {
        {/* JM/SBW - pull this out to its own function*/}
        const currentGlasses = props.order.glasses || []
        const newGlasses = currentGlasses.map(singleGlasses => singleGlasses.id).concat([props.selectedGlasses.id])
        props.updateOrder(props.order.id, newGlasses)
      }}>Add to Cart</button>
    </div>
  )
}


export default connect(
  function mapStateToProps(state) {
    return {
      selectedGlasses: state.glasses.selectedGlasses,
      order: state.order
    }
  },
  function mapDispatchToProps(dispatch) {
    // JM/SBW - probably could just be updateOrder, then we can also probs use the shorthand for mapDispatchToProps
    return {
      updateOrder: (orderId, glassesIdArr) => {
        dispatch(updateOrderInDB(orderId, glassesIdArr))
      }
    }
  }
)(SingleGlasses)

