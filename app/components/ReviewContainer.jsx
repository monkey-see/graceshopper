
import React from 'react'
import {connect} from 'react-redux'
import {addSingleGlassesReview} from '../reducers/reviews'

function ReviewContainer(props) {
  function submitReview(evt) {
    evt.preventDefault()
    const glassId = props.glassesId
    const reviewText = evt.target.reviewText.value
    const rating = evt.target.rating.value
    const userId = props.userId
    props.addReview(glassId, reviewText, rating, userId)
  }
  function addAllReviews(review) {
    return (
      <div className="text-right" key={review.id}>
        <h5 key={review.id}>"{review.text}" - {review.user.name} (Rating: {review.rating})</h5>
      </div>
    )
  }

  return (
    <div className="col-lg-12" style={{paddingBottom: 30}}>
      <hr />
      {
        (props.reviews) ? props.reviews.map(addAllReviews) : null
      }
      <hr />
      <form className="col-lg-6 pull-right" id="review-form" onSubmit={submitReview}>
        <textarea className="form-control" name="reviewText" form="review-form" placeholder="Enter Review Here" style={{marginBottom: 10}}></textarea>
        <input type="submit" className="btn btn-warning pull-right" value="Add Review" />
        <select className="form-control pull-right" name="rating" style={{width: 40, marginRight: 5}}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
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
      addReview: (glassId, review, rating, userId) => {
        dispatch(addSingleGlassesReview(glassId, review, rating, userId))
      }
    }
  }
)(ReviewContainer)

