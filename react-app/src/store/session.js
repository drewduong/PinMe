// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const FOLLOW = 'session/FOLLOW'
const UNFOLLOW = 'session/UNFOLLOW'
const UPDATE_PROFILE = 'session/UPDATE_PROFILE'

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
})

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




export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });


  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};


export const signUp = (username, email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const followThunk = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/follow`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userId)
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

const initialState = { user: null, users: {} };

// export default function reducer(state = initialState, action) {
//   switch (action.type) {
//     case SET_USER:
//       return { user: action.payload }
//     case REMOVE_USER:
//       return { user: null }
//     case FOLLOW:
//       return { ...state, user: action.payload }
//     // case UNFOLLOW:
//     //   return { ...state.filter(username => username !== action.payload) }
//     case UPDATE_PROFILE: {
//       const newState = { ...state }
//       newState[action.user.id] = action.user
//       // console.log('Update user (reducer)', newState)
//       return newState
//     }
//     default:
//       return state;
//   }
// }


export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload }
    case REMOVE_USER:
      return { user: null }
    case FOLLOW:
      return { ...state, user: action.payload }
    // case UNFOLLOW:
    //   return { ...state.filter(username => username !== action.payload) }
    case UPDATE_PROFILE: {
      const newState = { ...state }
      newState[action.user.id] = action.user
      // console.log('Update user (reducer)', newState)
      return newState
    }
    default:
      return state;
  }
}