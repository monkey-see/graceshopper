'use strict'
import React from 'react'
import {render} from 'react-dom'
import {Link} from 'react-router'
import {connect} from 'react-redux'

import {setSeason} from '../reducers/seasons'

// JM/SBW - at a certain point... reconsider file architecture components vs containers

function SeasonsContainer(props) {
  // JM/SBW - ideally, not hardcoded. Loop over this
  return (
    <div>
      <Link data-id='1' to="/glasses/season/1">Winter</Link>
      <Link data-id='2' to="/glasses/season/2">Spring</Link>
      <Link data-id='3' to="/glasses/season/3">Summer</Link>
      <Link data-id='4' to="/glasses/season/4">Fall</Link>
    </div>
  )
}

export default connect(
  function mapStateToProps({glasses}) {
    return {glasses}
  },
  function mapDispatchToProps(dispatch) {
    return {}
  }
)(SeasonsContainer)
