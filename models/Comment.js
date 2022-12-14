const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReplySchema = new Schema(
  {
    // custome id to avoid confustion with parent comment _id
    replyId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    replyBody: {
      type: String,
      required: true,
      trim: true
    },
    writtenBy: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const CommentSchema = new Schema({
  writtenBy: {
    type: String
  },
  commentBody: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => dateFormat(createdAtVal)
  },
  // replies are nested directly in comments and not referred to
  replies: [ReplySchema]
  },
  {
    toJSON: {
      getters: true,
      virtuals: true
    },
    id: false
  },
);

CommentSchema.virtual('replyCount').get(function() {
  return this.replies.length;
})

const Comment = model('Comment', CommentSchema);

module.exports = Comment;