'use strict'

const db = require('APP/db')
const Order = db.model('orders')
const User = db.model('users')
const Glasses = db.model('glasses')

const {mustBeLoggedIn, forbidden, adminOnly} = require('./auth.filters')

const selfOrAdminOrders = (req, res, next) => {
  Order.findById(req.params.id, {include: [ User ]})
    .then(foundOrder => {
      if (!req.user.admin || req.user.id !== foundOrder.user.id) {
        res.status(401).send('Not Authorized')
      }
      next()
    })
}

// commented-out parts are for auth, to be finished later
module.exports = require('express').Router()
  .get('/',
    // mustBeLoggedIn,
    (req, res, next) => {
      // if (req.user.admin) {
      Order.findAll()
        .then(allOrders => res.json(allOrders))
        .catch(next)
        // JM/SBW - kill dead code
        // } else {
        //   Order.findAll({
        //     where: {
        //       user_id: req.user.id
        //     }
        //   })
        //   .then(userOrders => res.json(userOrders))
        //   .catch(next)
        // }
    })
  .post('/',
    (req, res, next) =>
      Order.create({
        glasses: req.body.glasses
      })
        .then(createdOrder => {
          createdOrder.setUser(req.body.userId)
          res.status(201).json(createdOrder)
        })
        .catch(next))
  .get('/:id',
    // mustBeLoggedIn,
    // selfOrAdminOrders,
    (req, res, next) =>
      Order.findById(req.params.id, {include: [ User ]})
        .then(order => res.json(order))
        .catch(next))
  // JM/SBW - restful route issue 
  .get('/user/:userId',
    (req, res, next) => {
      Order.findAll({
        where: {
          user_id: req.params.userId
        }
      })
        .then(foundOrders => res.json(foundOrders))
        .catch(next)
    })
  .get('/status/:status',
    // mustBeLoggedIn,
    (req, res, next) =>
      Order.findAll({
        where: {
          status: req.params.status
        }
      })
        .then(filteredOrders => res.json(filteredOrders))
        .catch(next)
    )
  .put('/:id',
    // mustBeLoggedIn,
    (req, res, next) =>
      Order.findById(req.params.id)
        .then(foundOrder => foundOrder.update(req.body))
        .then(updatedOrder => res.json(updatedOrder))
        .catch(next)
    )
