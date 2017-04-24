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
    (req, res, next) => {
      if (req.user) {
        Order.findOrCreate({
          where: {
            user_id: req.user.id,
            status: 'in-progress'
          },
          include: [Glasses]
        })
          .then(createdOrder => {
            res.status(201).json(createdOrder[0])
          })
          .catch(next)
      } else {
        res.sendStatus(204)
      }
    })
  .get('/:id',
    // mustBeLoggedIn,
    // selfOrAdminOrders,
    (req, res, next) =>
      Order.findById(req.params.id, {include: [ User ]})
        .then(order => res.json(order))
        .catch(next))
  .put('/:id',
    // mustBeLoggedIn,
    (req, res, next) => {
      if (req.user) {
        Order.findById(req.params.id)
          .then(foundOrder => {
            return foundOrder.setGlasses(req.body.glasses)
          })
          .then(() => {
            return Order.findById(req.params.id, {include: [Glasses]})
          })
          .then(updatedOrder => res.json(updatedOrder))
          .catch(next)
      } else {
        res.sendStatus(204)
      }
    }

    )
