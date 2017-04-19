'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
// import GlassesContainer from './containers/GlassesContainer'
// import SingleSeasonContainer from './containers/SingleSeasonContainer'
// import SingleGlassesContainer from './containers/SingleGlassesContainer'
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
      <Route path="/" component={Layout}>
        {/*<Route path="/glasses" component={GlassesContainer} />
        <Route path="/glasses/season/:seasonId" component={SingleSeasonContainer} />
        <Route path="/glasses/:glassesId" component={SingleGlassesContainer} />
        <Route path="/results" component={SearchResultsContainer} />
        <Route path="/cart" component={CartContainer} />
        <Route path="/checkout" component={CheckoutContainer} />
        <Route path="/signup" component={SignupContainer} />*/}
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('main')
)
