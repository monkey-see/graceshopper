'use strict'

const db = require('APP/db')
const Glasses = db.model('glasses')
const router = require('express').Router()



// Create:
// add glasses to database
router.post('/', (req, res, next) => {
  Glasses.create(req.body)
    .then(createdGlasses => {
      res.send(createdGlasses).status(201)
    })
    .catch(next)
})

// view all glasses
router.get('/', (req, res, next) => {
  Glasses.findAll({
    where: req.query
  })
    .then(glassesArr => {
      res.status(200).send(glassesArr)
    })
    .catch(next)
})

// get single glasses
router.get('/:id', (req, res, next) => {
  const glassesId = req.params.id
  Glasses.findById(glassesId)
    .then(foundGlasses => {
      res.status(200).send(foundGlasses)
    })
    .catch(next)
})

// Update:
// update price on glasses
// update colour/material
// update stock
router.put('/:id', (req, res, next) => {
  const glassesId = req.params.id

  Glasses.findById(glassesId)
    .then(foundGlasses => {
      return foundGlasses.update(req.body)
    })
    .then(() => {
      res.sendStatus(200)
    })
    .catch(next)
})

// Delete:
// delete whole glasses instance
router.delete('/:id', (req, res, next) => {
  const glassesId = req.params.id

  Glasses.findById(glassesId)
    .then(foundGlasses => {
      return foundGlasses.destroy()
    })
    .then(() => {
      res.sendStatus(200)
    })
    .catch(next)
})

module.exports = router
