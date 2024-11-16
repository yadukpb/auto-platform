import * as constants from '../constants/socialConstants'

export const communityListReducer = (state = { communities: [] }, action) => {
  switch (action.type) {
    case constants.COMMUNITY_LIST_REQUEST:
      return { loading: true, communities: [] }
    case constants.COMMUNITY_LIST_SUCCESS:
      return { loading: false, communities: action.payload }
    case constants.COMMUNITY_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const communityDetailsReducer = (state = { community: { posts: [] } }, action) => {
  switch (action.type) {
    case constants.COMMUNITY_DETAILS_REQUEST:
      return { loading: true }
    case constants.COMMUNITY_DETAILS_SUCCESS:
      return { loading: false, community: action.payload }
    case constants.COMMUNITY_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const postDetailsReducer = (state = { post: { comments: [] } }, action) => {
  switch (action.type) {
    case constants.POST_DETAILS_REQUEST:
      return { loading: true }
    case constants.POST_DETAILS_SUCCESS:
      return { loading: false, post: action.payload }
    case constants.POST_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const postCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.POST_CREATE_REQUEST:
      return { loading: true }
    case constants.POST_CREATE_SUCCESS:
      return { loading: false, success: true, post: action.payload }
    case constants.POST_CREATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const communityCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.COMMUNITY_CREATE_REQUEST:
      return { loading: true }
    case constants.COMMUNITY_CREATE_SUCCESS:
      return { loading: false, success: true, community: action.payload }
    case constants.COMMUNITY_CREATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}