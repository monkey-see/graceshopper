'use strict'

const db = require('APP/db');
const Glasses = db.model('glasses');
const router = require('express').Router();


// JM/SBW test your models! much easier

//Create:
//add glasses to database
// JM/SBW - RESTful routes, so '/' should create glasses
// include some kind of isAdmin middleware to check for admin access
// toastr (if you have time)
router.post('/admin/new-glasses', (req, res, next) => {
  Glasses.create(req.body)
    .then(createdGlasses => {
      res.send(createdGlasses).status(201)
    })
    .catch(next)
})

//Read:
//retrieve glasses by season
// JM/SBW - season/:season_id/glasses
router.get('/season/:season_id', (req, res, next) => {
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
// // JM/SBW - perhaps use query params?
router.get('/color/:color', (req, res, next) => {
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
// JM/SBW - perhaps use query params?
router.get('/material/:material', (req, res, next) => {
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
// JM/SBW - same as above, just PUT to /:id with admin middleware
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
// JM/SBW - same as above, just DELETE to /:id with admin middleware
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
