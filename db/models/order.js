'use strict'

const {STRING, ENUM, ARRAY, JSON} = require('sequelize')

module.exports = db => db.define('orders', {
  status:{
  	type: ENUM('completed', 'pending','cancelled','created'),
  	defaultValue: 'created' 
  },
  glasses: {
  	type:ARRAY(JSON),
  	allowNull: falsenode
  }
}, { 	
	getterMethods:{
		totalPrice :function(){
			let total = 0;
			this.glasses.forEach(product =>{
				total += product.price 
			})
			return total
		}
	}
})

module.exports.associations = (Order, {User}) => {
  Order.belongsTo(User)
}
