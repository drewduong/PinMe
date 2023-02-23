/*----------ACTION TYPES----------*/

const GET_PINS = 'pins/GET_PINS'
// const GET_BOARD_PINS = 'pins/GET_BOARD_PINS'
const CREATE_PIN = 'pins/CREATE_PIN'
const UPDATE_PIN = 'pins/UPDATE_PIN'
const DELETE_PIN = 'pins/DELETE_PIN'

/*----------ACTION CREATORS----------*/

// Get all pins
const getPinsAction = (pins) => {
  // console.log('Get all pins (action)', pins)
  return {
    type: GET_PINS,
    pins
  }
}

// Get board's pins
// const getBoardPinsAction = (pins) => {
// console.log('Get all board's pins (action)', pins)
//   return {
//     type: GET_BOARD_PINS,
//     pins
//   }
// }

// Create a pin
const createPinAction = (pin) => {
  // console.log('Create a pin (action)', pin)
  return {
    type: CREATE_PIN,
    pin
  }
}


// Update pin - payload contains updated pin details and pinId
const updatePinAction = (pin) => {
  return {
    type: UPDATE_PIN,
    pin
  }
}

// Delete pin
const deletePinAction = (pinId) => {
  return {
    type: DELETE_PIN,
    pinId
  }
}

/*----------THUNK ACTION CREATORS----------*/

export const getPinsThunk = () => async (dispatch) => {
  const response = await fetch('/api/pins/')

  if (response.ok) {
    const data = await response.json()
    // console.log('Get all pins (thunk)', data)
    dispatch(getPinsAction(data))
    return data
  }
}

// export const getBoardPinsThunk = () => async (dispatch) => {
//   const response = await fetch('/api/pins/current')
//   if (response.ok) {
//     const data = await response.json()
//     // console.log("Get board's pins backend data (thunk):", data)
//     dispatch(getBoardPinsAction(data))
//     return data
//   }
// }

export const createPinThunk = (pin) => async (dispatch) => {
  // console.log("Create a pin user input payload (thunk):", pin)
  const response = await fetch('/api/pins/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(pin)
  })

  if (response.ok) {
    const data = await response.json()
    // console.log("Create a pin backend data (thunk):", data)
    dispatch(createPinAction(data))
    return data
  }
}

export const updatePinThunk = (pin, pinId) => async (dispatch) => {
  // console.log("Update a pin user input payload (thunk):", pin)
  const response = await fetch(`/api/pins/${pinId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(pin)
  })

  if (response.ok) {
    const data = await response.json()
    // console.log("Update a pin backend data (thunk)", data)
    dispatch(updatePinAction(data))
    return data
  }
}

export const deletePinThunk = (pinId) => async (dispatch) => {
  const response = await fetch(`/api/pins/${pinId}`, {
    method: 'DELETE'
  })

  if (response.ok) {
    const data = await response.json()
    dispatch(deletePinAction(pinId))
    return data
  }
}

/*----------REDUCER----------*/

const initialState = {}

const pinReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PINS: {
      const newState = { ...state }
      action.pins.pins.forEach(pin => {
        newState[pin.id] = pin
      })
      return newState
    }
    // case GET_BOARD_PINS: {
    //   const newState = { ...state }
    //   action.pins.pins.forEach(pin => {
    //     newState[pin.id] = pin
    //   })
    // console.log('All user boards (reducer):', newState)
    //   return newState
    // }
    case CREATE_PIN: {
      const newState = { ...state }
      newState[action.pin.id] = action.pin
      // console.log('Create a pin (reducer):', newState)
      return newState
    }
    case UPDATE_PIN: {
      const newState = { ...state }
      // Double check newState or state
      newState[action.pin.id] = action.pin
      // console.log('Update user pin (reducer)', newState)
      return newState
    }
    case DELETE_PIN: {
      const newState = { ...state }
      delete newState[action.pinId]
      return newState
    }
    default:
      return state
  }
}


export default pinReducer