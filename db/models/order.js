'use strict'

const {STRING, ENUM, ARRAY, JSON} = require('sequelize')

module.exports = db => db.define('orders', {
  status: {
    type: ENUM('in-progress', 'processing', 'cancelled', 'shipped'),
    defaultValue: 'in-progress'
  }
}, {
  instanceMethods: {
    totalPrice: function() {
      return this.getGlasses()
        .then(glasses => glasses.reduce((totalPrice, glassesInstance) => {
          return totalPrice + glassesInstance.price
        }, 0))
        .catch(console.error)
    }
  }
})

module.exports.associations = (Order, {User, Glasses}) => {
  Order.belongsTo(User)
  Order.belongsToMany(Glasses, {through: 'GlassesOrders'})
}
