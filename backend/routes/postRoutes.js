import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import {
  createPost,
  getPostById,
  deletePost,
  createComment,
  likePost
} from '../controller/socialController.js'

const router = express.Router()

router.route('/')
  .post(protect, createPost)

router.route('/:id')
  .get(getPostById)
  .delete(protect, deletePost)

router.route('/:id/comments')
  .post(protect, createComment)

router.route('/:id/like')
  .post(protect, likePost)

export default router