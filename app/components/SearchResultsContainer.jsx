import React from 'react'
import {connect} from 'react-redux'
import {getSearchGlasses} from '../reducers/glasses'
import ReviewContainer from './ReviewContainer'
import {Link} from 'react-router'

function SearchResults(props) {
  return (
    <div className="container-fluid center-block">
      <h2 style={{ textAlign: 'center', marginBottom: '40px', fontFamily: 'Raleway, sans-serif', fontSize: '35px', color: '#3d5c5c' }}>Showing all search results</h2>
      {
        props.searchResultGlasses.map(glasses => {
          return (
            <div key={glasses.id} className="col-xs-12 thumb center-block">
              <Link to={`/glasses/${glasses.id}`}><img src={glasses.image} className="img-responsive center-block" style={{height: '100px'}} ></img></Link>
              <Link to={`/glasses/${glasses.id}`} className="col-xs-12" style={{fontFamily: 'Raleway, sans-serif', color: '#3d5c5c', textAlign: 'center', fontSize: '20px'}}>{glasses.name}</Link>
            </div>
          )
        })
      }
    </div>
  )
}

export default connect(function mapStateToProps(state) {
  return {searchResultGlasses: state.glasses.searchResultGlasses}
}, function mapDispatchToProps(dispatch) {
  return {
    findGlasses: (searchName, searchColor, searchMaterial) => {
      dispatch(getSearchGlasses(searchName, searchColor, searchMaterial))
    }
  }
})(SearchResults)
