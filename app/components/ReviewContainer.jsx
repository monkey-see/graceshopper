
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
      <ul className="list-group" key={review.id}>
        <li className="list-group-item" key={review.id}>"{review.text}" - {review.user.name}
        <img className="float-left" src="http://i.imgur.com/yikZKmh.png" width={20 * review.rating} style={{position: 'absolute', height: 20}} />
        <img className="float-left" src="http://i.imgur.com/oCvicxF.png" width={100} style={{position: 'absolute', height: 20}} />
        </li>
      </ul>
    )
  }

  return (
    <div className="col-lg-12" style={{paddingBottom: 30}}>
      <hr />
      <h2>Reviews</h2>
      {
        (props.reviews) ? props.reviews.map(addAllReviews) : null
      }
      <hr />
      <h4>Add a Review</h4>
      <form className="col-lg-6 pull-left" id="review-form" onSubmit={submitReview}>
        <textarea className="form-control" name="reviewText" form="review-form" placeholder="Enter Review Here" style={{marginBottom: 10, height: 120}}></textarea>
        <input type="submit" className="btn btn-warning pull-right" value="Add Review" />
        <select className="form-control pull-right" name="rating" style={{width: 40, marginRight: 5}}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <label className="pull-right" style={{margin: '6px'}}>Rating:</label>
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

