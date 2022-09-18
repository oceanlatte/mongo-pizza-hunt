const router = require('express').Router();
const {
  addComment,
  removeComment,
  addReply,
  removeReply
} = require('../../controllers/comment-controller');

// route for: /api/comments/<pizzaId>
router.route('/:pizzaId').post(addComment);

// route for: /api/comments/<pizzaId>/<commentId>
router
  .route('/:pizzaId/:commentId')
  .put(addReply)
  .delete(removeComment);

// route for deleting a reply. Needs: pizzaId, commentId, replyId
router.route('/:pizzaId/:commentId/:replyId').delete(removeReply);


module.exports = router;