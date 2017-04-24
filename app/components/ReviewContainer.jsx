
import React from 'react'
import {connect} from 'react-redux'
import {addSingleGlassesReview} from '../reducers/reviews'

function ReviewContainer(props) {
  
  function submitReview(evt){
  	evt.preventDefault();
  	let glassId = props.glassesId
  	let reviewText =  evt.target.reviewText.value
  	let rating = evt.target.rating.value
  	let userId = props.userId

  	props.addReview(glassId,reviewText,rating,userId)

  }

  return (
    <div>
  		{ 
  			(props.reviews)?  props.reviews.map((review) => {
  			  return <p key={review.id}> {review.text} </p>
  			}):null
  		}




      <form id="review-form" onSubmit={submitReview}>

      	<textarea name="reviewText" form="review-form" placeholder="Enter Review here"></textarea>
		<select name="rating">
	  		<option value="1">1</option>
	  		<option value="2">2</option>
	  		<option value="3">3</option>
	  		<option value="4">4</option>
	  		<option value="5">5</option>
		</select>
		<input type="submit" className="btn btn-warning" value="Add Review" />

	  </form>

	  

    </div>
  )
}


export default connect(
  function mapStateToProps(state) {
    return {
      userId: (state.auth)? state.auth.id: '',
      glassesId: state.glasses.selectedGlasses.id,
      reviews: state.reviews.reviews
    }
  },
  function mapDispatchToProps(dispatch) {
    return {
      addReview:(glassId, review, rating, userId) => {
        dispatch(addSingleGlassesReview(glassId, review, rating, userId))
      }
    }
  }
)(ReviewContainer)

