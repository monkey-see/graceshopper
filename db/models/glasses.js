'use strict'

// bcrypt docs: https://www.npmjs.com/package/bcrypt
const bcrypt = require('bcryptjs')
    , {STRING, VIRTUAL, FLOAT, TEXT, INTEGER} = require('sequelize')

// JM/SBW - in future, it's nice to keep models as a simple singular word
module.exports = db => db.define('glasses', {
  name: {
    type: STRING,
    allowNull: false
    // JM/SBW - consider notEmpty?
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
    // // JM/SBW - consider integer due to JS weirdness?
    type: FLOAT,
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
  // JM/SBW - maybe add instance mehtod to get avg review?
});

module.exports.associations = (Glasses, {Season, Review}) => {
  Glasses.belongsTo(Season);
  Glasses.hasMany(Review)
};
