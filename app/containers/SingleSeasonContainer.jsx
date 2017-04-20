'use strict'
import React from 'react'
import {render} from 'react-dom'
import {Link} from 'react-router'
import {connect} from 'react-redux'


class SingleSeasonContainer extends React.Component {
  render() {
    const filtered = this.props.glasses.allGlasses.filter(glasses => (glasses.season_id === +this.props.selectedSeason))
    return (
      <div>
        {
          filtered.map(glasses => {
            return (
              <div>
                <Link to={`/glasses/${glasses.id}`}>{glasses.name}</Link>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default connect(
  function mapStateToProps({glasses, selectedSeason}) {
    return {glasses, selectedSeason}
  })(SingleSeasonContainer)
