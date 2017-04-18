'use strict'

const api = module.exports = require('express').Router()

api
  .get('/heartbeat', (req, res) => res.send({ok: true}))
  .use('/auth', require('./auth'))
  .use('/users', require('./users'))
  .use('/glasses', require('./glasses'))
  .use('/seasons', require('./seasons'))
  .use('/reviews', require('./reviews'))
  .use('/orders', require('./orders'))

// No routes matched? 404.
api.use((req, res) => res.status(404).end())
