const { Schema, model } = require('mongoose');

const PizzaSchema = new Schema({
  pizzaName: {
    type: String
  },
  createdBy: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  size: {
    type: String,
    default: 'Large'
  },
  toppings: [] // can also be just 'Array' instead of brackets
});

// create the pizza model using the pizzaSchema
const Pizza = model('Pizza', PizzaSchema)

// export the pizza model
module.exports = { Pizza };