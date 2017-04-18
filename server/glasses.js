'use strict'

const db = require('APP/db');
const Glasses = db.model('glasses');
const router = require('express').Router();



//Create:
//add glasses to database
router.post('/admin/new-glasses', (req, res, next) => {
  Glasses.create(req.body)
    .then(createdGlasses => {
      res.send(createdGlasses).status(201)
    })
    .catch(next)
})

//Read:
//retrieve glasses by season
router.get('/:season_id', (req, res, next) => {
  const season_id = req.params.season_id;

  Glasses.findAll({
    where: {season_id}
  })
    .then(glassesArr => {
      res.status(200).send(glassesArr)
    })
    .catch(next)
})

//view all glasses
router.get('/', (req, res, next) => {
  Glasses.findAll()
    .then(glassesArr => {
      res.status(200).send(glassesArr)
    })
    .catch(next)
});

//filter by colour
router.get('/:color', (req, res, next) => {
  const color = req.params.color;

  Glasses.findAll({
    where: {color}
  })
    .then(glassesArr => {
      res.status(200).send(glassesArr)
    })
    .catch(next)
})

//filter my material
router.get('/:material', (req, res, next) => {
  const material = req.params.material;

  Glasses.findAll({
    where: {material}
  })
    .then(glassesArr => {
      res.status(200).send(glassesArr)
    })
    .catch(next);
})

//get single glasses
router.get('/:glassesId', (req, res, next) => {
  const glassesId = req.params.glassesId;

  Glasses.findById(glassesId)
    .then(foundGlasses => {
      res.status(200).send(foundGlasses)
    })
    .catch(next)
})

//Update:
//update price on glasses
//update colour/material
//update stock
router.put('/admin/:glassesId', (req, res, next) => {
  const glassesId = req.params.glassesId;

  Glasses.findById(glassesId)
    .then(foundGlasses => {
      return foundGlasses.update(req.body)
    })
    .then(() => {
      res.sendStatus(200)
    })
    .catch(next)
})

//Delete:
//delete whole glasses instance
router.delete('/admin/:glassesId', (req, res, next) => {
  const glassesId = req.params.glassesId;

  Glasses.findById(glassesId)
    .then(foundGlasses => {
      return foundGlasses.destroy()
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch(next);
});

module.exports = router;
