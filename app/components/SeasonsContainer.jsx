'use strict'
import React from 'react'
import {render} from 'react-dom'
import {Link} from 'react-router'
import {connect} from 'react-redux'

import {setSeason} from '../reducers/seasons'


function SeasonsContainer(props) {
  return (
    <div className="container center">

      <div className="row">
        <Link data-id='1' to="/glasses/season/1"><img style={{opacity: 0.5}} src="https://i.imgur.com/yrlgzRO.png" className="col-sm-6"/></Link>
        <Link data-id='2' to="/glasses/season/2"><img style={{opacity: 0.5}} src="https://i.imgur.com/u6rPCpR.png" className="col-sm-6"/></Link>
      </div>

      <div className="row">
        <Link data-id='3' to="/glasses/season/3"><img style={{opacity: 0.5}} src="https://i.imgur.com/BtMQVle.png" className="col-sm-6"/></Link>
        <Link data-id='4' to="/glasses/season/4"><img style={{opacity: 0.5}} src="https://i.imgur.com/1QHrjnS.png" className="col-sm-6"/></Link>
      </div>
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
