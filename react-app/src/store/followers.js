/*----------ACTION TYPES----------*/

const GET_USER_FOLLOWERS = 'follows/GET_USER_FOLLOWERS'
const FOLLOW = 'follows/FOLLOW'
const UNFOLLOW = 'follows/UNFOLLOW'


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
  const response = await fetch('/api/users/current')
  if (response.ok) {
    const data = await response.json()
    dispatch(getUserFollowersAction(data))
    return data
  }
}

export const followThunk = (follower, followerId) => async (dispatch) => {
  const response = await fetch(`/api/users/${followerId}/follow`, {
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
  const response = await fetch(`/api/users/${followerId}`, {
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

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_FOLLOWERS: {
      const newState = { ...state }
      action.users.followers.forEach(user => {
        newState[user.id] = user
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


export default userReducer