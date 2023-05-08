import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { updateBoardThunk } from '../../store/boards';
import './UpdateBoardForm.css';

const UpdateBoardForm = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { boardId } = useParams()

  // const user = useSelector(state => state.session.user)
  const board = useSelector(state => state.boards[+boardId])
  // console.log('Current user board (useSelector):', board)

  const [name, setName] = useState(board.name)
  const [boardImage, setBoardImage] = useState(board.board_image)
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const [validationErrors, setValidationErrors] = useState([])

  /* Passive data: dispatch within useEffect
     Active data, dispatch within onSubmit */

  useEffect(() => {
    const errors = []

    if (!name) errors.push("Name of board is required")
    if (name.length > 30) errors.push("Name must be less than 30 characters")
    if (!boardImage) errors.push("Image url is required")
    if (!boardImage.match(/\.(jpg|jpeg|png|gif)$/)) errors.push('Valid image url is required')

    setValidationErrors(errors)
  }, [name, boardImage])


  const onSubmit = async (e) => {
    e.preventDefault()
    setHasSubmitted(true)

    if (!validationErrors.length) {
      board.name = name
      board.board_image = boardImage

      // return console.log('board: ', board)
      dispatch(updateBoardThunk(board, boardId))

      // console.log('Create a board (onSubmit)):', newBoard)
      // history.push(`/boards/${newBoard.id}`)
      history.push(`/boards/${boardId}`)
    }
  }

  if (!board) return (<div>Board Not Found</div>)

  return (
    <div className="boarding-container">
      <form onSubmit={onSubmit} hasSubmitted={hasSubmitted}>
        <div className="boarding-item">
          <h2>Update Board</h2>
          <ul className="errors">
            {hasSubmitted && validationErrors.length > 0 && validationErrors.map((error, idx) => (
              <li key={idx}><i class="fa-sharp fa-solid fa-circle-exclamation"></i> {error}</li>
            ))}
          </ul>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Name'
            maxLength="30"
          />
          <input
            type="url"
            value={boardImage}
            onChange={(e) => setBoardImage(e.target.value)}
            placeholder='Preview Image URL'
          />
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  )
}

export default UpdateBoardForm