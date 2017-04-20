'use strict'
import React from 'react'
import {render} from 'react-dom'
import {Link} from 'react-router'
import {connect} from 'react-redux'


class SeasonsContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  handleClick(evt){
    const seasonGlasses = this.props.glasses.filter((glasses) =>{
      return glasses.season_id === evt.target.getAttribute('data-id')

    })
  }
  // if we get the seasonGlasses arr here, how do we pass down to single season component w/o it being a child?
  // should we instead connect the single season to the store? then this handleclick could set a selectedSeason property
  // on the store obj. and when rendering single season we filter store glasses by that selectedSeason (onEnter or componentDidMount)

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
  function mapDispatchToProps() {
    return {}
  }
)(SeasonsContainer)
