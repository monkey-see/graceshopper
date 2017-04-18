'use strict'

const db = require('APP/db');
const Review = db.model('review');
const User = db.model('users');
const Glasses = db.model('glasses');
const router = require('express').Router();

router.param('glassesId', (req, res, next, glassesId) => {
  Glasses.findById(glassesId)
    .then(foundGlasses => {
     req.glasses = foundGlasses;
     next()
    })
    .catch(next);
});

// Create:
// create a review

router.post('/:glassesId/:userId/new-review', (req, res, next) => {
  const glass_id = req.params.glassesId;
  const user_id = req.params.userId;
  Review.create({
    text,
    rating,
    glass_id,
    user_id
  })
    .then(createdReview => {
      res.send(createdReview).status(200);
    })
    .catch(next);
});

// Read:
// get all reviews for a pair of glasses
router.get('/', (req, res, next) => {
  Review.findAll()
    .then(reviewsArr => {
      res.send(reviewsArr).status(200);
    })
    .catch(next);
});


// tbd: get all reviews by a user (if we end up adding a user profile page)

// Update:
// edit a review by reviewID

router.put('/:reviewId', (req, res, next) => {
  const reviewId = req.params.reviewId;
  Review.findById(reviewId)
    .then(foundReview => {
      return foundReview.update(req.body)
    })
    .then(updatedReview => {
      res.send(updatedReview).status(200);
    })
    .catch(next);
});

// Delete:
// delete a review

router.delete('/:reviewId', (req, res, next) => {
  const reviewId = req.params.reviewId;
  Review.findById(reviewId)
    .then(foundReview => {
      return foundReview.destroy();
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch(next);
});


module.exports = router;
