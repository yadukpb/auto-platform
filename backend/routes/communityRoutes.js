import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import {
  getCommunities,
  createCommunity,
  getCommunityById,
  deleteCommunity
} from '../controller/socialController.js'

const router = express.Router()

router.route('/')
  .get(getCommunities)
  .post(protect, createCommunity)

router.route('/:id')
  .get(getCommunityById)
  .delete(protect, deleteCommunity)

export default router