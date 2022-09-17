const router = require('express').Router();
const {
  addComment,
  removeComment
} = require('../../controllers/comment-controller');

// route for: /api/comments/<pizzaId>
router.route('/:pizzaId').post(addComment);

// route for: /api/comments/<pizzaId>/<commentId>
router.route('/:pizzaId/:commentId').delete(removeComment);

module.exports = router;
