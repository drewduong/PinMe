/*----------ACTION TYPES----------*/

const GET_FOLLOWS = 'follows/GET_FOLLOWS'
const FOLLOW = 'follows/FOLLOW'
const UNFOLLOW = 'follows/UNFOLLOW'


/*----------ACTION CREATORS----------*/

// Load user followers and following
const getFollowsAction = (user) => {
  return {
    type: GET_FOLLOWS,
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


/*----------THUNK ACTION CREATORS----------*/

export const getFollowsThunk = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/followers/${userId}`)
  if (response.ok) {
    const data = await response.json()
    console.log('data from payload: ', data)
    dispatch(getFollowsAction(data))
    return data
  }
}

export const followThunk = (userId) => async (dispatch) => {
  const response = await fetch('/api/users/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userId)
  })

  if (response.ok) {
    const data = await response.json()
    console.log('payload data: ', data)
    dispatch(followAction(data))
    return data
  }
}

export const unfollowThunk = (userId) => async (dispatch) => {
  const response = await fetch('/api/users/', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userId)
  })

  if (response.ok) {
    const data = await response.json()
    dispatch(unfollowAction(data))
    return data
  }
}




/*----------REDUCER----------*/

const initialState = { following: {}, followers: {} }

const followsReducer = (state = initialState, action) => {
  let followingList = {}
  let followersList = {}

  switch (action.type) {
    case GET_FOLLOWS: {
      const newState = {}

      action.user.following?.forEach(following => followingList[following.id] = following)
      action.user.followers?.forEach(followers => followersList[followers.id] = followers)

      newState.following = followingList
      newState.followers = followersList

      return newState
    }
    case FOLLOW: {
      const newState = { ...state, following: { ...state.following }, followers: { ...state.followers } }
      // console.log('newState: ', newState)
      action.user.following.forEach(following => newState.following[following.id] = following)
      action.user.followers.forEach(followers => newState.followers[followers.id] = followers)
      return newState
    }
    case UNFOLLOW: {
      const newState = { ...state, followers: { ...state.followers } }

      action.user.following.forEach(following => followingList[following.id] = following)
      newState.following = followingList
      return newState
    }
    default:
      return state
  }
}


export default followsReducer