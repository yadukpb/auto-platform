import React, { useState } from 'react'
import { Card, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { likePost, deletePost } from '../../actions/socialActions'
import { Link } from 'react-router-dom'
import moment from 'moment'

const PostCard = ({ post }) => {
  const dispatch = useDispatch()
  const [likes, setLikes] = useState(post.likes)
  const { userInfo } = useSelector(state => state.userLogin)

  const handleLike = () => {
    dispatch(likePost(post._id))
    setLikes(prev => [...prev, userInfo._id])
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      dispatch(deletePost(post._id))
    }
  }

  return (
    <Card className='my-3'>
      <Card.Body>
        <Row>
          <Col md={1} className='text-center'>
            <Button 
              variant={likes.includes(userInfo?._id) ? 'primary' : 'light'}
              onClick={handleLike}
            >
              <i className='fas fa-arrow-up'></i>
            </Button>
            <div className='my-2'>{likes.length}</div>
          </Col>
          <Col md={11}>
            <small className='text-muted'>
              Posted by {post.user.name} in{' '}
              <Link to={`/community/${post.community._id}`}>
                {post.community.name}
              </Link>{' '}
              {moment(post.createdAt).fromNow()}
            </small>
            <h4>
              <Link to={`/post/${post._id}`} className='text-dark'>
                {post.title}
              </Link>
            </h4>
            <p>{post.content}</p>
            <div className='d-flex gap-2'>
              <Link 
                to={`/post/${post._id}`} 
                className='btn btn-light btn-sm'
              >
                <i className='fas fa-comment'></i> {post.comments.length} Comments
              </Link>
              {userInfo?._id === post.user._id && (
                <Button 
                  variant='danger' 
                  size='sm'
                  onClick={handleDelete}
                >
                  <i className='fas fa-trash'></i> Delete
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

export default PostCard