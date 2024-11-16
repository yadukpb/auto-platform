import axios from 'axios'
import * as constants from '../constants/socialConstants'

export const listCommunities = () => async (dispatch) => {
  try {
    dispatch({ type: constants.COMMUNITY_LIST_REQUEST })
    const { data } = await axios.get('/api/communities')
    dispatch({ type: constants.COMMUNITY_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: constants.COMMUNITY_LIST_FAIL,
      payload: error.response?.data.message || error.message,
    })
  }
}

export const createCommunity = (communityData) => async (dispatch, getState) => {
  try {
    dispatch({ type: constants.COMMUNITY_CREATE_REQUEST })

    const { userLogin: { userInfo } } = getState()

    if (!userInfo || !userInfo.token) {
      throw new Error('Please login first')
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post('/api/communities', communityData, config)
    dispatch({ type: constants.COMMUNITY_CREATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: constants.COMMUNITY_CREATE_FAIL,
      payload: error.response?.data.message || error.message,
    })
  }
}

export const getCommunityDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: constants.COMMUNITY_DETAILS_REQUEST })
    const { data } = await axios.get(`/api/communities/${id}`)
    dispatch({ type: constants.COMMUNITY_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: constants.COMMUNITY_DETAILS_FAIL,
      payload: error.response?.data.message || error.message,
    })
  }
}

export const createPost = (post) => async (dispatch, getState) => {
  try {
    dispatch({ type: constants.POST_CREATE_REQUEST })
    const { userLogin: { userInfo } } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.post('/api/posts', post, config)
    dispatch({ type: constants.POST_CREATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: constants.POST_CREATE_FAIL,
      payload: error.response?.data.message || error.message,
    })
  }
}

export const likePost = (postId) => async (dispatch, getState) => {
  try {
    dispatch({ type: constants.POST_LIKE_REQUEST })
    const { userLogin: { userInfo } } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.post(`/api/posts/${postId}/like`, {}, config)
    dispatch({ type: constants.POST_LIKE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: constants.POST_LIKE_FAIL,
      payload: error.response?.data.message || error.message,
    })
  }
}



export const deletePost = (postId) => async (dispatch, getState) => {
    try {
      dispatch({ type: constants.POST_DELETE_REQUEST })
      const { userLogin: { userInfo } } = getState()
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      await axios.delete(`/api/posts/${postId}`, config)
      dispatch({ type: constants.POST_DELETE_SUCCESS })
    } catch (error) {
      dispatch({
        type: constants.POST_DELETE_FAIL,
        payload: error.response?.data.message || error.message,
      })
    }
  }
  
  export const createComment = (postId, comment) => async (dispatch, getState) => {
    try {
      dispatch({ type: constants.COMMENT_CREATE_REQUEST })
      const { userLogin: { userInfo } } = getState()
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.post(`/api/posts/${postId}/comments`, comment, config)
      dispatch({ type: constants.COMMENT_CREATE_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: constants.COMMENT_CREATE_FAIL,
        payload: error.response?.data.message || error.message,
      })
    }
  }
  
  export const deleteComment = (postId, commentId) => async (dispatch, getState) => {
    try {
      dispatch({ type: constants.COMMENT_DELETE_REQUEST })
      const { userLogin: { userInfo } } = getState()
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      await axios.delete(`/api/posts/${postId}/comments/${commentId}`, config)
      dispatch({ type: constants.COMMENT_DELETE_SUCCESS })
    } catch (error) {
      dispatch({
        type: constants.COMMENT_DELETE_FAIL,
        payload: error.response?.data.message || error.message,
      })
    }
  }
  
  export const getPostDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: constants.POST_DETAILS_REQUEST })
      const { data } = await axios.get(`/api/posts/${id}`)
      dispatch({ type: constants.POST_DETAILS_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: constants.POST_DETAILS_FAIL,
        payload: error.response?.data.message || error.message,
      })
    }
  }