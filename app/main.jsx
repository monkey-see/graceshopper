'use strict'
import React from 'react'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider, onEnter} from 'react-redux'
import {getSingleGlasses, getGlasses} from './reducers/glasses'
import {setSeason} from './reducers/seasons'
import {createOrderInDB} from './reducers/orders'

import store from './store'

import SingleGlassesContainer from './components/SingleGlassesContainer'
import SeasonsContainer from './components/SeasonsContainer'
import SingleSeasonContainer from './components/SingleSeasonContainer'

// JM/SBW - kill dead code
// import SearchResultsContainer from './containers/SearchResultsContainer'
// import CartContainer from './containers/CartContainer'
// import CheckoutContainer from './containers/CheckoutContainer'
// import SignupContainer from './containers/SignupContainer'
import Layout from './components/Layout'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import NotFound from './components/NotFound'

// const App = connect(
//   ({ auth }) => ({ user: auth }) // mapStateToProps
// )(
//   ({ user, children }) => // dumb component function
//     <div>

//       <nav>
//         {user ? <WhoAmI/> : <Login/>}
//       </nav>
//       {children ? children : <h2>Home Page</h2>}
//     </div>
// )

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Layout} onEnter={() => {
        {/* JM/SBW - pull the onEnter things out into separate function*/}
        store.dispatch(getGlasses())
        store.dispatch(createOrderInDB())
      }}>
        <Route path="/glasses/:glassesId" component={SingleGlassesContainer}
          onEnter={routerState => store.dispatch(getSingleGlasses(routerState.params.glassesId))} />
        {/*JM/SBW - consider seasons/:id/glasses*/}
        <Route path="/glasses/season/:seasonId" component={SingleSeasonContainer}
          onEnter={routerState => store.dispatch(setSeason(routerState.params.seasonId))} />
        {/*
        <Route path="/results" component={SearchResultsContainer} />
        <Route path="/cart" component={CartContainer} />
        <Route path="/checkout" component={CheckoutContainer} />
        <Route path="/signup" component={SignupContainer} />
        */}
        <IndexRoute component={SeasonsContainer} />
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('main')
)
