/*----------ACTION TYPES----------*/

const UPDATE_PROFILE = 'boards/UPDATE_PROFILE'


/*----------ACTION CREATORS----------*/

// Update profile - payload contains updated user details and userId
const updateProfileAction = (user) => {
  return {
    type: UPDATE_PROFILE,
    user
  }
}

/*----------THUNK ACTION CREATORS----------*/

export const updateProfileThunk = (user, userId) => async (dispatch) => {
  // console.log("Update a user input payload (thunk):", userId)
  const response = await fetch(`/api/users/${userId}`, {
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