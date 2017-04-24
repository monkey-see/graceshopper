import React from 'react'
import {connect} from 'react-redux'
import {updateOrderInDB} from '../reducers/orders'
import ReviewContainer from './ReviewContainer'

function SingleGlasses(props) {
  

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
        const currentGlasses = props.order.glasses || []
        const newGlasses = currentGlasses.map(singleGlasses => singleGlasses.id).concat([props.selectedGlasses.id])
        props.updateOrder(props.order.id, newGlasses)
      }}>Add to Cart</button>
      <div>
        <ReviewContainer />
      </div>

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
    return {
      updateOrder: (orderId, glassesIdArr) => {
        dispatch(updateOrderInDB(orderId, glassesIdArr))
      },
      getReviews: (glassesId) => {
        dispatch(getSingleGlassesReviews(glassesId))
      }
    }
  }
)(SingleGlasses)

