'use strict'

const {STRING, ENUM, ARRAY, JSON} = require('sequelize')

module.exports = db => db.define('orders', {
  status: {
    type: ENUM('in-progress', 'processing', 'cancelled', 'shipped'),
    defaultValue: 'in-progress'
  }
})

module.exports.associations = (Order, {User, Glasses}) => {
  Order.belongsTo(User)
  Order.belongsToMany(Glasses, {through: 'GlassesOrders'})
}
