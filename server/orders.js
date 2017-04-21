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
      Order.findAll({
        where: req.query
      })
        .then(allOrders => res.json(allOrders))
        .catch(next)
    })
  .post('/',
    (req, res, next) =>
      Order.findOrCreate({
        where: {
          user_id: req.user.id,
          status: 'in-progress'
        }
      })
        .then(createdOrder => {
          createdOrder.setGlass(req.body.glassesId)
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
  .put('/:id',
    // mustBeLoggedIn,
    (req, res, next) =>
      Order.findById(req.params.id)
        .then(foundOrder => foundOrder.update(req.body))
        .then(updatedOrder => res.json(updatedOrder))
        .catch(next)
    )
