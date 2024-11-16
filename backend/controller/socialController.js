import asyncHandler from 'express-async-handler'
import Community from '../models/communityModel.js'
import Post from '../models/postModel.js'
import mongoose from 'mongoose'

// @desc    Get all communities
// @route   GET /api/communities
// @access  Public
const getCommunities = asyncHandler(async (req, res) => {
  const communities = await Community.find({})
    .populate('creator', 'name email')
    .populate('members', 'name email')
  res.json(communities)
})

// @desc    Create a community
// @route   POST /api/communities
// @access  Private
const createCommunity = asyncHandler(async (req, res) => {
  const { name, description } = req.body

  if (!req.user) {
    res.status(401)
    throw new Error('User not authenticated')
  }

  const community = await Community.create({
    name,
    description,
    creator: req.user._id,
    members: [req.user._id]
  })

  if (community) {
    res.status(201).json(community)
  } else {
    res.status(400)
    throw new Error('Invalid community data')
  }
})

// @desc    Get community details
// @route   GET /api/communities/:id
// @access  Public
const getCommunityById = asyncHandler(async (req, res) => {
  const community = await Community.findById(req.params.id)
    .populate('creator', 'name email')
    .populate('members', 'name email')
    .populate({
      path: 'posts',
      populate: {
        path: 'user',
        select: 'name email'
      },
      options: { sort: { createdAt: -1 } }
    })

  if (community) {
    res.json(community)
  } else {
    res.status(404)
    throw new Error('Community not found')
  }
})

// @desc    Create a post
// @route   POST /api/posts
// @access  Private
const createPost = asyncHandler(async (req, res) => {
  const { title, content, community } = req.body
  
  if (!mongoose.Types.ObjectId.isValid(community)) {
    res.status(400)
    throw new Error('Invalid community ID')
  }

  const post = new Post({
    title,
    content,
    user: req.user._id,
    community: community
  })

  const createdPost = await post.save()

  if (createdPost) {
    const populatedPost = await Post.findById(createdPost._id).populate('user', 'name email')
    
    await Community.findByIdAndUpdate(community, {
      $push: { posts: createdPost._id }
    })
    
    res.status(201).json(populatedPost)
  } else {
    res.status(400)
    throw new Error('Invalid post data')
  }
})

// @desc    Get post details
// @route   GET /api/posts/:id
// @access  Public
const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate('user', 'name email')
    .populate('community', 'name')
    .populate('comments.user', 'name email')
  
  if (post) {
    res.json(post)
  } else {
    res.status(404)
    throw new Error('Post not found')
  }
})

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
  
  if (post) {
    if (post.user.toString() === req.user._id.toString()) {
      await post.remove()
      await Community.findByIdAndUpdate(post.community, {
        $pull: { posts: post._id }
      })
      res.json({ message: 'Post removed' })
    } else {
      res.status(401)
      throw new Error('Not authorized')
    }
  } else {
    res.status(404)
    throw new Error('Post not found')
  }
})

// @desc    Create comment
// @route   POST /api/posts/:id/comments
// @access  Private
const createComment = asyncHandler(async (req, res) => {
  const { content } = req.body
  const post = await Post.findById(req.params.id)
  
  if (post) {
    const comment = {
      content,
      user: req.user._id
    }
    post.comments.push(comment)
    await post.save()
    res.status(201).json(post)
  } else {
    res.status(404)
    throw new Error('Post not found')
  }
})

// @desc    Like/Unlike post
// @route   POST /api/posts/:id/like
// @access  Private
const likePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
  
  if (post) {
    const alreadyLiked = post.likes.includes(req.user._id)
    if (alreadyLiked) {
      post.likes = post.likes.filter(id => id.toString() !== req.user._id.toString())
    } else {
      post.likes.push(req.user._id)
    }
    await post.save()
    res.json(post)
  } else {
    res.status(404)
    throw new Error('Post not found')
  }
})

// @desc    Delete community
// @route   DELETE /api/communities/:id
// @access  Private
const deleteCommunity = asyncHandler(async (req, res) => {
  const community = await Community.findById(req.params.id)
  
  if (community) {
    if (req.user.isAdmin) {
      await community.remove()
      res.json({ message: 'Community removed' })
    } else {
      res.status(401)
      throw new Error('Not authorized as admin')
    }
  } else {
    res.status(404)
    throw new Error('Community not found')
  }
})

export {
  getCommunities,
  createCommunity,
  getCommunityById,
  createPost,
  getPostById,
  deletePost,
  createComment,
  likePost,
  deleteCommunity
}