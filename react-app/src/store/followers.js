/*----------ACTION TYPES----------*/

const GET_USER_FOLLOWERS = 'followers/GET_USER_FOLLOWERS'
const FOLLOW = 'followers/FOLLOW'
const UNFOLLOW = 'followers/UNFOLLOW'


/*----------ACTION CREATORS----------*/

// Get user followers
const getUserFollowersAction = (follower) => {
  return {
    type: GET_USER_FOLLOWERS,
    follower
  }
}

// Follow a user
const followAction = (follower) => {
  return {
    type: FOLLOW,
    follower
  }
}

// Unfollow a user
const unfollowAction = (follower) => {
  return {
    type: UNFOLLOW,
    follower
  }
}


/*----------THUNK ACTION CREATORS----------*/

export const getUserFollowersThunk = () => async (dispatch) => {
  const response = await fetch('/api/followers/current')
  if (response.ok) {
    const data = await response.json()
    dispatch(getUserFollowersAction(data))
    return data
  }
}

export const followThunk = (follower) => async (dispatch) => {
  const response = await fetch(`/api/followers/new}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(follower)
  })
  if (response.ok) {
    const data = await response.json()
    dispatch(followAction(data))
    return data
  }
}

export const unfollowThunk = (followerId) => async (dispatch) => {
  const response = await fetch(`/api/followers/${followerId}`, {
    method: 'DELETE'
  })

  if (response.ok) {
    const data = await response.json()
    dispatch(unfollowAction(followerId))
    return data
  }
}


/*----------REDUCER----------*/

const initialState = {}

const followerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_FOLLOWERS: {
      const newState = { ...state }
      action.followers.followers.forEach(follower => {
        newState[follower.id] = follower
      })
      return newState
    }
    case FOLLOW: {
      const newState = { ...state }
      newState[action.user.id] = action.user
      return newState
    }
    case UNFOLLOW: {
      const newState = { ...state }
      delete newState[action.userId]
      return newState
    }
    default:
      return state
  }
}


export default followerReducer