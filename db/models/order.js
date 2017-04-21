'use strict'

const {STRING, ENUM, ARRAY, JSON} = require('sequelize')

module.exports = db => db.define('orders', {
  status: {
    type: ENUM('completed', 'pending', 'cancelled', 'created'),
    defaultValue: 'created'
  }
}, {
  // getterMethods: {
  //   // totalPrice: function() {
  //   //   this.glasses.reduce( => {
  //   //     total += product.price
  //   //   })
  //   // }
  // }
})

module.exports.associations = (Order, {User, Glasses}) => {
  Order.belongsTo(User)
  Order.belongsToMany(Glasses, {through: 'GlassesOrders'})
}
