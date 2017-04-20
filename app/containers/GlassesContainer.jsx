//USELESS

'use strict'
import React from 'react'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'
import {getGlasses} from '../reducers/glasses'

class Glasses extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getAllGlasses()
  }

  render() {
    return (
      <div>

      </div>
    )
  }
}

export default connect(
  function mapStateToProps(state) {
    return {glasses: state.glasses.glasses}
  },
  function mapDispatchToProps(dispatch) {
    return {
      getAllGlasses: function() {
        dispatch(getGlasses())
      }
    }
  }
)(Glasses)
