'use strict'

// bcrypt docs: https://www.npmjs.com/package/bcrypt
const bcrypt = require('bcryptjs')
    , {STRING, VIRTUAL, FLOAT, TEXT, INTEGER} = require('sequelize')

module.exports = db => db.define('reviews', {
  text: {
    type: TEXT,
    allowNull: false
  },
  rating: {
    type: INTEGER,
    allowNull: false,
    validate: {
      isIn: [[1, 2, 3, 4, 5]]
    }
  }
});

module.exports.associations = (Review, {User, Glasses}) => {
  Review.belongsTo(User);
  Review.belongsTo(Glasses);
};
