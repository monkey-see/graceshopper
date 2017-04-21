'use strict'

const db = require('APP/db');
const Season = db.model('seasons');
const router = require('express').Router();

// Create:
// add a season

router.post('/admin/new', (req, res, next) => {
  Season.create(req.body)
    .then(createdSeason => {
      res.status(201).send(createdSeason)
    })
    .catch(next)
})

// Read:
// get all seasons (drop-down menu)

router.get('/', (req, res, next) => {
  Season.findAll()
    .then(seasonArr => {
      res.status(200).send(seasonArr)
    })
    .catch(next)
})

// get one season
router.get('/:seasonId', (req, res, next) => {
  const seasonId = req.params.seasonId;

  Season.findById(seasonId)
    .then(foundSeason => {
      res.status(200).send(foundSeason)
    })
    .catch(next)
})

// Update:
// nothing here

// Delete:
// delete a single season instance
router.delete('/:seasonId', (req, res, next) => {
  const seasonId = req.params.seasonId;

  Season.findById(seasonId)
    .then(foundSeason => {
      return foundSeason.destroy()
    })
    .then(() => {
      res.sendStatus(200)
    })
    .catch(next)

})

module.exports = router;
