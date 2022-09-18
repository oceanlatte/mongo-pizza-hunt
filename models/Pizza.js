const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String,
      // required can also be set to true, w/o the message
      required: 'Please provide a pizza name!',
      trim: true
    },
    createdBy: {
      type: String,
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal)
    },
    size: {
      type: String,
      required: true,
      // enum stands for enumerable (data that can be iterated over)
      enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
      default: 'Large'
    },
    toppings: [], // can also be just 'Array' instead of brackets
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

// get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function() {
  return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});

// create the pizza model using the pizzaSchema
const Pizza = model('Pizza', PizzaSchema)

module.exports = Pizza;