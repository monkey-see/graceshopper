'use strict'
import React from 'react'
import {render} from 'react-dom'
import {Link} from 'react-router'
import {connect} from 'react-redux'

import {setSeason} from '../reducers/seasons'


class SeasonsContainer extends React.Component {
  handleClick(evt) {
    this.props.setSeason(evt.target.getAttribute('data-id'))
  }

  render() {
    return (
      <div>
        <Link data-id='1' to="/glasses/season/1" onClick={this.handleClick}>Winter</Link>
        <Link data-id='2' to="/glasses/season/2" onClick={this.handleClick}>Spring</Link>
        <Link data-id='3' to="/glasses/season/3" onClick={this.handleClick}>Summer</Link>
        <Link data-id='4' to="/glasses/season/4" onClick={this.handleClick}>Fall</Link>
      </div>
    )
  }
}

export default connect(
  function mapStateToProps({glasses}) {
    return {glasses}
  },
  function mapDispatchToProps(dispatch) {
    return {
      setSeason: seasonId => {
        dispatch(setSeason(seasonId))
      }
    }
  }
)(SeasonsContainer)
