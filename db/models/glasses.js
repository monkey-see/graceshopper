'use strict'

// bcrypt docs: https://www.npmjs.com/package/bcrypt
const bcrypt = require('bcryptjs')
    , {STRING, VIRTUAL, FLOAT, TEXT, INTEGER, ENUM} = require('sequelize')


module.exports = db => db.define('glasses', {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  color: {
    type: STRING,
    allowNull: false
  },
  material: {
    type: ENUM('acetate', 'metal', 'mixed'),
    allowNull: false
  },
  price: {
    type: INTEGER,
    allowNull: false
  },
  description: {
    type: TEXT,
    allowNull: false
  },
  image: {
    type: STRING,
    allowNull: false,
    validate: {
      isUrl: true
    }
  },
  quantity: {
    type: INTEGER,
    allowNull: false
  }
}, {
  instanceMethods: {
    averageRating: function() {
      return this.getReviews()
        .then(reviews => {
          const totalReviewCount = reviews.reduce((totalReviewCount, reviewInstance) => {
            return totalReviewCount + reviewInstance.rating
          }, 0)
          return totalReviewCount / reviews.length
        })
    }
  }
})

module.exports.associations = (Glasses, {Season, Review, Order}) => {
  Glasses.belongsTo(Season)
  Glasses.hasMany(Review)
  Glasses.belongsToMany(Order, {through: 'GlassesOrders'})
}
