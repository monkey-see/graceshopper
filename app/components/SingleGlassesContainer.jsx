import React from 'react'
import {connect} from 'react-redux'
import {updateOrderInDB} from '../reducers/orders'
import ReviewContainer from './ReviewContainer'
import {getSingleGlassesReviews} from '../reducers/reviews'

function SingleGlasses(props) {
  const {name, image, color, material, price, description, quantity, id} = props.selectedGlasses
  const {reviews} = props.reviews

  const totalRating = reviews && reviews.reduce((total, review) => total + review.rating, 0)
  const averageRating = totalRating && totalRating / reviews.length

  function addToCart() {
    const currentGlasses = props.order.glasses || []
    const newGlasses = currentGlasses.map(singleGlasses => singleGlasses.id).concat([id])
    props.updateOrder(props.order.id, newGlasses)
  }

  return (
    <div style={{marginTop: 50, marginLeft: 20, marginRight: 20}}>
      <div className="col-lg-6 thumbnail">
        <img src={image} />
      </div>
      <div className="col-lg-6">
        <img className="float-left" src="http://i.imgur.com/yikZKmh.png" width={20 * averageRating} style={{position: 'absolute', height: 20}} />
        <img className="float-left" src="http://i.imgur.com/oCvicxF.png" width={100} style={{position: 'absolute', height: 20}} />
        <h1>{name}</h1>
        <h6>{quantity} in stock</h6>
        <h3>{description}</h3>
        <ul className="list-group">
          <li className="list-group-item">Color: {color}</li>
          <li className="list-group-item">Material: {material}</li>
          <li className="list-group-item">Price: ${price / 100}</li>
        </ul>
        <button className="btn btn-success" onClick={addToCart}>Add to Cart</button>
      </div>
      <ReviewContainer />
    </div>
  )
}

export default connect(
  function mapStateToProps(state) {
    return {
      selectedGlasses: state.glasses.selectedGlasses,
      order: state.order,
      reviews: state.reviews
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

