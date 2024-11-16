import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Card } from 'react-bootstrap'
import { getPostDetails } from '../../actions/socialActions'
import Comments from '../../components/social/Comments'
import PostCard from '../../components/social/PostCard'
import Loader from '../../components/Loader'
import Message from '../../components/Message'

const PostDetailScreen = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const { post, loading, error } = useSelector(state => state.postDetails)

  useEffect(() => {
    dispatch(getPostDetails(id))
  }, [dispatch, id])

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col md={8}>
            <PostCard post={post} />
            <Comments postId={id} comments={post.comments} />
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>About this discussion</Card.Title>
                <div className='post-stats'>
                  <div>Posted by: {post.user.name}</div>
                  <div>Comments: {post.comments.length}</div>
                  <div>Likes: {post.likes.length}</div>
                  <div>Posted: {new Date(post.createdAt).toLocaleDateString()}</div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default PostDetailScreen