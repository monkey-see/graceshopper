'use strict'

const db = require('APP/db');
const Season = db.model('seasons');
const Glasses = db.model('glasses');
const router = require('express').Router();

// Create:
// add a season

router.post('/', (req, res, next) => {
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
router.get('/:id', (req, res, next) => {
  const seasonId = req.params.id;

  Season.findById(seasonId)
    .then(foundSeason => {
      res.status(200).send(foundSeason)
    })
    .catch(next)
})

router.get('/:id/glasses', (req, res, next) => {
  const season_id = req.params.id;

  Glasses.findAll({
    where: {season_id}
  })
    .then(glassesArr => {
      res.status(200).send(glassesArr)
    })
    .catch(next)
})

// Update:
// nothing here

// Delete:
// delete a single season instance
router.delete('/:id', (req, res, next) => {
  const seasonId = req.params.id;

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
