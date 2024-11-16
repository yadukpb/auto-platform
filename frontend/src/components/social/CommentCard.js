import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { deleteComment } from '../../actions/socialActions'
import moment from 'moment'

const CommentCard = ({ comment, postId }) => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.userLogin)

  const deleteHandler = () => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      dispatch(deleteComment(postId, comment._id))
    }
  }

  return (
    <Card className='mb-2'>
      <Card.Body>
        <div className='d-flex justify-content-between'>
          <small className='text-muted'>
            {comment.user.name} · {moment(comment.createdAt).fromNow()}
          </small>
          {userInfo?._id === comment.user._id && (
            <Button variant='link' className='text-danger p-0' onClick={deleteHandler}>
              Delete
            </Button>
          )}
        </div>
        <Card.Text>{comment.content}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default CommentCard