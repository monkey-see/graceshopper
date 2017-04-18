'use strict'

// bcrypt docs: https://www.npmjs.com/package/bcrypt
const bcrypt = require('bcryptjs')
    , {STRING, VIRTUAL, FLOAT, TEXT, INTEGER} = require('sequelize')

module.exports = db => db.define('season', {
  season: {
    type: STRING,
    allowNull: false
  }
});

module.exports.associations = (Season, {Glasses}) => {
  Season.hasMany(Glasses);
};
