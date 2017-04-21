import React from 'react'
import {connect} from 'react-redux'

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
      <button className="btn btn-success" >Add to Cart</button>
    </div>
  )
}


export default connect(
  function mapStateToProps(state) {
    return {selectedGlasses: state.glasses.selectedGlasses}
  }
)(SingleGlasses)

