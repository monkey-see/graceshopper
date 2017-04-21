'use strict'

const {STRING, ENUM, ARRAY, JSON} = require('sequelize')

// JM/SBW - consider making a join table of GlassesOrders instead of this json array type
module.exports = db => db.define('orders', {
  status: {
    // JM/SBW - consider cart functionality using the Order model
    type: ENUM('completed', 'pending', 'cancelled', 'created'),
    defaultValue: 'created'
  },
  glasses: {
    type: ARRAY(JSON),
    allowNull: false
  }
}, {
  getterMethods: {
    totalPrice: function() {
      // JM/SBW - reduce?
      let total = 0
      this.glasses.forEach(product => {
        total += product.price
      })
      return total
    }
  }
})

module.exports.associations = (Order, {User}) => {
  Order.belongsTo(User)
}
