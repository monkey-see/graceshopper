import React from 'react'
import {connect} from 'react-redux'
import {updateOrderInDB} from '../reducers/orders'
import ReviewContainer from './ReviewContainer'
//props.allGlasses is an array of objects
//allGlasses.color ""
//allGlasses.id #
//allGlasses.image "" url
//allGlasses.name ""
//allGlasses.price
//allGlasses.seasonId
function SearchResults(props) {

  return (
    <div>
      <h2 style={{fontFamily: 'Raleway, sans-serif'}}>Showing all results for {props.location.query.searchParams}</h2>
      {

        props.allGlasses.map((glasses) => {
          return <p key={glasses.id}>{glasses.image}</p>
        })
      }
    </div>

  )
}

export default connect(function mapStateToProps(state) {
  return {allGlasses: state.glasses.allGlasses}
}, function mapDispatchToProps(dispatch) {
  return {
    // updateOrder: (orderId, glassesIdArr) => {   dispatch(updateOrderInDB(orderId,
    // glassesIdArr)) }, getReviews: (glassesId) => {
    // dispatch(getSingleGlassesReviews(glassesId)) }
  }
})(SearchResults)
