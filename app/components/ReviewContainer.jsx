
import React from 'react'
import {connect} from 'react-redux'


function ReviewContainer(props) {
  return (
    <div>
  		{ 
  			(props.reviews)?  props.reviews.map((review) => {
  			  return <p key={review.id}> {review.text} </p>
  			}):null
  		}


      
      <button className="btn btn-warning" onClick={() => {
        // const currentGlasses = props.order.glasses || []
        // const newGlasses = currentGlasses.map(singleGlasses => singleGlasses.id).concat([props.selectedGlasses.id])
        // props.updateOrder(props.order.id, newGlasses)
      }}>Add Review</button>
    </div>
  )
}


export default connect(
  function mapStateToProps(state) {
    return {
      reviews: state.reviews.reviews
    }
  },
  function mapDispatchToProps(dispatch) {
    return {
      // getReviews: (orderId, glassesIdArr) => {
      //   dispatch(getSingleGlassesReviews(orderId, glassesIdArr))
      // }
    }
  }
)(ReviewContainer)

