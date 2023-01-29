/*----------ACTION TYPES----------*/

// const GET_BOARD = 'boards/GET_BOARD'
const GET_USER_BOARDS = 'boards/GET_USER_BOARDS'
const CREATE_BOARD = 'boards/CREATE_BOARD'
const UPDATE_BOARD = 'boards/UPDATE_BOARD'
const DELETE_BOARD = 'boards/DELETE_BOARD'

/*----------ACTION CREATORS----------*/

// Get board details
// const getBoardAction = (board) => {
//   console.log('Get board details (action)', board)
//   return {
//     type: GET_BOARD,
//     board
//   }
// }


// Get user boards
const getUserBoardsAction = (boards) => {
  // console.log('Get all user boards (action)', boards)
  return {
    type: GET_USER_BOARDS,
    boards
  }
}

// Create a board
const createBoardAction = (board) => {
  // console.log('Create a board (action)', board)
  return {
    type: CREATE_BOARD,
    board
  }
}


// Update board - payload contains updated board details and boardId
const updateBoardAction = (board) => {
  return {
    type: UPDATE_BOARD,
    board
  }
}

// Delete board
const deleteBoardAction = (boardId) => {
  return {
    type: DELETE_BOARD,
    boardId
  }
}

/*----------THUNK ACTION CREATORS----------*/

// export const getBoardThunk = (boardId) => async (dispatch) => {
//   const response = await fetch(`/api/boards/${boardId}`)

//   if (response.ok) {
//     const data = await response.json()
//     console.log('Get board details backend data (thunk)', data)
//     dispatch(getBoardAction(data))
//     return data
//   }
// }

export const getUserBoardsThunk = () => async (dispatch) => {
  const response = await fetch('/api/boards/current')
  if (response.ok) {
    const data = await response.json()
    // console.log("Get user boards backend data (thunk):", data)
    dispatch(getUserBoardsAction(data))
    return data
  }
}

export const createBoardThunk = (board) => async (dispatch) => {
  // console.log("Create a board user input payload (thunk):", board)
  const response = await fetch('/api/boards/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(board)
  })

  if (response.ok) {
    const data = await response.json()
    // console.log("Create a board backend data (thunk):", data)
    dispatch(createBoardAction(data))
    return data
  }
}

export const updateBoardThunk = (board, boardId) => async (dispatch) => {
  // console.log("Update a board user input payload (thunk):", boardId)
  const response = await fetch(`/api/boards/${boardId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(board)
  })

  if (response.ok) {
    const data = await response.json()
    // console.log("Update a board backend data (thunk)", data)
    dispatch(updateBoardAction(data))
    return data
  }
}

export const deleteBoardThunk = (boardId) => async (dispatch) => {
  const response = await fetch(`/api/boards/${boardId}`, {
    method: 'DELETE'
  })

  if (response.ok) {
    const data = await response.json()
    dispatch(deleteBoardAction(boardId))
    return data
  }
}

/*----------REDUCER----------*/

const initialState = {}

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    // case GET_BOARD: {
    //   const newState = { ...state }
    //   newState[board.id] = board
    //   return newState
    // }
    case GET_USER_BOARDS: {
      const newState = { ...state }
      action.boards.boards.forEach(board => {
        newState[board.id] = board
      })
      // console.log('All user boards (reducer):', newState)
      return newState
    }
    case CREATE_BOARD: {
      const newState = { ...state }
      newState[action.board.id] = action.board
      // console.log('Create user board (reducer):', newState)
      return newState
    }
    case UPDATE_BOARD: {
      const newState = { ...state }
      // Double check newState or state
      newState[action.board.id] = action.board
      // console.log('Update user board (reducer)', newState)
      return newState
    }
    case DELETE_BOARD: {
      const newState = { ...state }
      delete newState[action.boardId]
      return newState
    }
    default:
      return state
  }
}


export default boardReducer