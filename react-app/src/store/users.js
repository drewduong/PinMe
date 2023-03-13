/*----------ACTION TYPES----------*/

const GET_USER_FOLLOWERS = 'users/GET_USER_FOLLOWERS'
const FOLLOW = 'users/FOLLOW'
const UNFOLLOW = 'users/UNFOLLOW'
const UPDATE_PROFILE = 'users/UPDATE_PROFILE'


/*----------ACTION CREATORS----------*/

// Get user followers
const getUserFollowersAction = (user) => {
  return {
    type: GET_USER_FOLLOWERS,
    user
  }
}

// Follow a user
const followAction = (user) => {
  return {
    type: FOLLOW,
    user
  }
}

// Unfollow a user
const unfollowAction = (user) => {
  return {
    type: UNFOLLOW,
    user
  }
}

// Update profile - payload contains updated user details and userId
const updateProfileAction = (user) => {
  // console.log("Update a user profile (action):", user)
  return {
    type: UPDATE_PROFILE,
    user
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

export const followThunk = (user, userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/follow`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  if (response.ok) {
    const data = await response.json()
    dispatch(followAction(data))
    return data
  }
}

export const unfollowThunk = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}`, {
    method: 'DELETE'
  })

  if (response.ok) {
    const data = await response.json()
    dispatch(unfollowAction(userId))
    return data
  }
}

export const updateProfileThunk = (user, userId) => async (dispatch) => {
  // console.log("Update a user input payload (thunk):", userId)
  const response = await fetch(`/api/users/${Number(userId)}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })

  if (response.ok) {
    const data = await response.json()
    // console.log("Update a user profile backend data (thunk)", data)
    dispatch(updateProfileAction(data))
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
    case UPDATE_PROFILE: {
      const newState = { ...state }
      newState[action.user.id] = action.user
      // console.log('Update user (reducer)', newState)
      return newState
    }
    default:
      return state
  }
}


export default userReducer