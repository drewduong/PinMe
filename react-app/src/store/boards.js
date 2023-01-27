/*----------ACTION TYPES----------*/

const GET_USER_BOARDS = 'boards/GET_USER_BOARDS'
// const CREATE_BOARD = 'boards/CREATE_BOARD'
// const CREATE_BOARD_IMAGE = 'boards/CREATE_BOARD_IMAGE'
// const UPDATE_BOARD = 'boards/UPDATE_BOARD'
// const DELETE_BOARD = 'boards/DELETE_BOARD'

/*----------ACTION CREATORS----------*/

// Get user boards
const getUserBoardsAction = (boards) => {
  console.log('Get all user boards (action)', boards)
  return {
    type: GET_USER_BOARDS,
    boards
  }
}

// Create a board
// const createBoardAction = (board) => {
//   return {
//     type: CREATE_BOARD,
//     board
//   }
// }

// Create a board image
// const createBoardImageAction = (boardId, image) => {
//   return {
//     type: CREATE_BOARD,
//     boardId,
//     image
//   }
// }

// Update board - payload contains updated board details and boardId
// const updateBoardAction = (board) => {
//   return {
//     type: UPDATE_BOARD,
//     board
//   }
// }

// Delete board
// const deleteBoardAction = (boardId) => {
//   return {
//     type: UPDATE_BOARD,
//     boardId
//   }
// }

/*----------THUNK ACTION CREATORS----------*/

export const getUserBoardsThunk = () => async (dispatch) => {
  const response = await fetch('/api/boards/current')

  if (response.ok) {
    const boards = await response.json()
    console.log("Get user boards backend data (thunk):", boards)
    dispatch(getUserBoardsAction(boards))
    return boards
  }
}

/*----------REDUCER----------*/

const initialState = { userBoards: {} }

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_BOARDS: {
      const newState = { ...state, userBoards: {} }
      action.boards.boards.forEach(board => {
        newState.userBoards[board.id] = board
      })
      console.log('All user boards (reducer):', newState)
      return newState
    }
    default:
      return state
  }
}


export default boardReducer