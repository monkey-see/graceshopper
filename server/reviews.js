'use strict'

const db = require('APP/db')
const Review = db.model('reviews')
const User = db.model('users')
const Glasses = db.model('glasses')
const router = require('express').Router()

router.param('glassesId', (req, res, next, glassesId) => {
  Glasses.findById(glassesId)
    .then(foundGlasses => {
      req.glasses = foundGlasses
      next()
    })
    .catch(next)
})

// Create:
// create a review

router.post('/:glassesId', (req, res, next) => {
  Review.create({
    text: req.body.text,
    rating: req.body.rating
  })
    .then(createdReview => createdReview.setUser(req.body.userId))
    .then(reviewWithUser => reviewWithUser.setGlass(req.params.glassesId))
    .then(reviewWithUserAndGlasses => Review.findById(reviewWithUserAndGlasses.id, {include: [User]}))
    .then(createdReviewWithUser => res.status(200).send(createdReviewWithUser))
    .catch(next)
})

// Read:
// get all reviews for a pair of glasses

router.get('/:glassesId', (req, res, next) => {
  Review.findAll({
    where: {
      glass_id: req.params.glassesId
    },
    include: [User]
  })
    .then(reviewsArr => {
      res.status(200).send(reviewsArr)
    })
    .catch(next)
})

// tbd: get all reviews by a user (if we end up adding a user profile page)

// Update:
// edit a review by reviewID

router.put('/:id', (req, res, next) => {
  const reviewId = req.params.id
  Review.findById(reviewId)
    .then(foundReview => {
      return foundReview.update(req.body)
    })
    .then(updatedReview => {
      res.send(updatedReview).status(200)
    })
    .catch(next)
})

// Delete:
// delete a review

router.delete('/:id', (req, res, next) => {
  const reviewId = req.params.id
  Review.findById(reviewId)
    .then(foundReview => {
      return foundReview.destroy()
    })
    .then(() => {
      res.sendStatus(200)
    })
    .catch(next)
})


module.exports = router
