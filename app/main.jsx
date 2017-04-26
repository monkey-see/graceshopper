'use strict'
import React from 'react'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider, onEnter} from 'react-redux'

import {getSingleGlasses, getGlasses, getSearchGlasses} from './reducers/glasses'
import {setSeason} from './reducers/seasons'
import {createOrderInDB} from './reducers/orders'
import {getSingleGlassesReviews} from './reducers/reviews'
import store from './store'

import SingleGlassesContainer from './components/SingleGlassesContainer'
import SeasonsContainer from './components/SeasonsContainer'
import SingleSeasonContainer from './components/SingleSeasonContainer'
import CartContainer from './components/CartContainer'
import CheckoutContainer from './components/CheckoutContainer'
import Success from './components/Success'
import SearchResultsContainer from './components/SearchResultsContainer'
import Layout from './components/Layout'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import NotFound from './components/NotFound'

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Layout} onEnter={() => {
        store.dispatch(getGlasses())
        store.dispatch(createOrderInDB())
      }}>
        <Route path="/glasses/:glassesId" component={SingleGlassesContainer}
          onEnter={routerState => {
            store.dispatch(getSingleGlasses(routerState.params.glassesId));
            store.dispatch(getSingleGlassesReviews(routerState.params.glassesId));
          }} />
        <Route path="/glasses/season/:seasonId" component={SingleSeasonContainer}
          onEnter={routerState => store.dispatch(setSeason(routerState.params.seasonId))} />
        <Route path="/cart" component={CartContainer} />
        <Route path="/checkout" component={CheckoutContainer} />
        <Route path="/success" component={Success} />
        <Route path="/results" component={SearchResultsContainer}/>
        <IndexRoute component={SeasonsContainer} />
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('main')
)
