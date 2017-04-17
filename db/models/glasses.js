'use strict'

// bcrypt docs: https://www.npmjs.com/package/bcrypt
const bcrypt = require('bcryptjs')
    , {STRING, VIRTUAL, FLOAT, TEXT, INTEGER} = require('sequelize')


module.exports = db => db.define('glasses', {
  name: {
    type: STRING,
    allowNull: false
  },
  color: {
    type: STRING,
    allowNull: false
  },
  material: {
    type: STRING,
    allowNull: false
  },
  price: {
    type: FLOAT,
    allowNull: false
  },
  description: {
    type: TEXT,
    allowNull: false
  },
  image: {
    type: STRING,
    allowNull: false
  },
  quantity: {
    type: INTEGER,
    allowNull: false
  }
});

module.exports.associations = (Glasses, {Season, Review}) => {
  Glasses.belongsTo(Season);
  Glasses.hasMany(Review)
};
