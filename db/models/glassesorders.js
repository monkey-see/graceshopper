'use strict'

const {STRING} = require('sequelize')

module.exports = db => db.define('GlassesOrders')

module.exports.associations = (GlassesOrders, {Order, Glasses}) => {
  GlassesOrders.belongsTo(Order)
  GlassesOrders.belongsTo(Glasses)
}
