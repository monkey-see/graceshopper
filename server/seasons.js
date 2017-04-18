'use strict'

const db = require('APP/db');
const Season = db.model('season');
const router = require('express').Router();

// Create:
// add a season

router.post('/admin/new', (req, res, next) => {
  Season.create(req.body)
    .then(createdSeason => {
      res.send(createdSeason).status(201);
    })
    .catch(next);
})

// Read:
// get all seasons (drop-down menu)

router.get('/', (req, res, next) => {


  Season.findAll()
    .then(seasonArr => {
      res.send(seasonArr).status(200);
    })
    .catch(next);
})

// get one season
router.get('/:seasonId', (req, res, next) => {
  const seasonId = req.params.seasonId;

  Season.findById(seasonId)
    .then(foundSeason => {
      res.send(foundSeason).status(200);
    })
    .catch(next);
})

// Update:
// nothing here

// Delete:
// delete a single season instance
router.delete('/:seasonId', (req, res, next) => {
  const seasonId = req.params.seasonId;

  Season.findById(seasonId)
    .then(foundSeason => {
      return foundSeason.destroy();
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch(next);

})

module.exports = router;
