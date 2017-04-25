'use strict'
import React from 'react'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'
import {Link, browserHistory} from 'react-router'
import {SearchResultsContainer} from './SearchResultsContainer'
import {getSearchGlasses} from '../reducers/glasses'

import Login from './Login'
import WhoAmI from './WhoAmI'

class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.searching = this.searching.bind(this)
  }
  searching(evt) {
    evt.preventDefault()
    console.log(evt.target.name.value)
    this.props.findGlasses(evt.target.name.value, evt.target.color.value, evt.target.material.value)
    browserHistory.push('/results')
  }


  render() {
    return (
      <div>
        <nav className="navbar navbar-default" style={{color: '#fff652'}}>
          <div className="container-fluid">
             <img src="https://i.imgur.com/B3tbqwX.png" className="img-responsive center-block"height="300" />
            <div className="navbar-header" >
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="/">Monkey See</a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li className="active"><a href="#">Link <span className="sr-only">(current)</span></a></li>
                <li><a href="#">Link</a></li>
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Filter By Price <span className="caret"></span></a>
                  <ul className="dropdown-menu">
                    <li><a href="#">$0- $100</a></li>
                    <li><a href="#">$101- $150</a></li>
                    <li><a href="#">$150- $200</a></li>
                    <li role="separator" className="divider"></li>
                    <li><a href="#">Separated link</a></li>
                    <li role="separator" className="divider"></li>
                    <li><a href="#">One more separated link</a></li>
                  </ul>
                </li>
              </ul>
              <form className="navbar-form navbar-left" onSubmit={this.searching}>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Search Color" name="color"/>
                  <input type="text" className="form-control" placeholder="Search Name" name="name"/>
                  <input type="text" className="form-control" placeholder="Search Material" name="material"/>
                </div>
                <button className="btn btn-default">Submit</button>
              </form>
              <ul className="nav navbar-nav navbar-right">
                <li><Link to="/cart">Cart ({this.props.order.glasses ? this.props.order.glasses.length : 0})</Link></li>
                <li> {this.props.user ? <WhoAmI/> : <Login/>} </li>
              </ul>

            </div>
          </div>
        </nav>
        {this.props.children ? this.props.children : <h2>Home Page</h2>}
        {/*<Footer />*/}
      </div>
    )
  }
}

export default connect(
  function mapStateToProps(state) {
    return {
      user: state.auth,
      order: state.order
    }
  },
  function mapDispatchToProps(dispatch) {
    return {
      findGlasses: (name, color, material) => {
        dispatch(getSearchGlasses(name, color, material))
      }
    }
  }
)(Layout)
