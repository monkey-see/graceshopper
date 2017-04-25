'use strict'
import React from 'react'
import {render} from 'react-dom'
import {Link} from 'react-router'
import {connect} from 'react-redux'


class SingleSeasonContainer extends React.Component {

  render() {
    const filtered = this.props.glasses.allGlasses.filter(glasses => (glasses.season_id === +this.props.selectedSeason))

    const seasons = ['', 'winter', 'spring', 'summer', 'fall']

    return (
    <div className="container-fluid center-block"> {/* why isn't this centering?*/}
      <h1 style={{textAlign: 'center', marginBottom: '40px', fontFamily: 'Raleway, sans-serif', fontSize: '75px', color: '#3d5c5c' }}>{seasons[+this.props.selectedSeason]}</h1>
      <div className="col-xs-12">
        {
          filtered && filtered.map(glasses => {
            return (
              <div key={glasses.id} className="col-xs-4 thumb center-block">
                <Link to={`/glasses/${glasses.id}`}><img src={glasses.image} className="img-responsive center-block" style={{height: '100px'}} ></img></Link>
                <Link to={`/glasses/${glasses.id}`} className="col-xs-12" style={{fontFamily: 'Raleway, sans-serif', color: '#3d5c5c', textAlign: 'center', fontSize: '20px'}}>{glasses.name}</Link>
              </div>
            )
          })
        }
      </div>
    </div>
    )
  }
}

export default connect(
  function mapStateToProps({glasses, selectedSeason}) {
    return {glasses, selectedSeason}
  })(SingleSeasonContainer)
