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
  topping: [], // can also be just 'Array' instead of brackets
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
},
{
  toJSON: {
    vitruals: true,
  },
  id: false
});

// get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function() {
  return this.comments.length;
})

// create the pizza model using the pizzaSchema
const Pizza = model('Pizza', PizzaSchema)

// export the pizza model
module.exports = { Pizza };