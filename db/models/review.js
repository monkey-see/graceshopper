'use strict'

// bcrypt docs: https://www.npmjs.com/package/bcrypt
const bcrypt = require('bcryptjs')
    , {STRING, VIRTUAL, FLOAT, TEXT, INTEGER} = require('sequelize')

module.exports = db => db.define('review', {
  text: {
    type: TEXT,
    allowNull: false
  },
  rating: {
    type: INTEGER,
    allowNull: false
  }
});

module.exports.associations = (Review, {User, Glasses}) => {
  Review.belongsTo(User);
  Review.belongsTo(Glasses);
};
