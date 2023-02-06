import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createPinThunk } from '../../store/pins';
import { getUserBoardsThunk } from '../../store/boards'
import './CreatePinForm.css';

const CreatePinForm = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const user = useSelector(state => state.session.user)
  const boards = useSelector(state => Object.values(state.boards))
  // console.log('Current user boards (useSelector): ', boards)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [pinImage, setPinImage] = useState("")
  const [boardId, setBoardId] = useState(boards[0]?.id)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [validationErrors, setValidationErrors] = useState([])

  /* Passive data: dispatch within useEffect
     Active data, dispatch within onSubmit */

  useEffect(() => {
    dispatch(getUserBoardsThunk())
      .then(() => setIsLoaded(true))
  }, [dispatch])

  useEffect(() => {
    const errors = []

    // if (!boardId) errors.push("Board id is required")
    if (!title) errors.push("Title of board is required")
    if (title.length > 30) errors.push("Title must be less than 30 characters")
    if (!description) errors.push("Pin description is required")
    if (description.length > 255) errors.push("Pin description must be less than 255 characters")
    if (!pinImage) errors.push("Image url is required")
    if (!pinImage.match(/\.(jpg|jpeg|png)$/)) errors.push('Valid image url is required: .jpg, .jpeg, .png')

    setValidationErrors(errors)
  }, [boardId, title, description, pinImage])

  const onSubmit = async (e) => {
    e.preventDefault()
    setHasSubmitted(true)

    if (!validationErrors.length) {
      const pin = {
        title: title,
        description: description,
        pin_image: pinImage,
        board_id: boardId,
        user_id: user.id
      }
      // console.log('pin info: ', pin)

      dispatch(createPinThunk(pin))
      history.push('/discover')
    }
  }

  if (!boards) return (<h3>Currently no boards</h3>)

  return isLoaded && (
    <div className="pinning-container">
      <form onSubmit={onSubmit} hasSubmitted={hasSubmitted}>
        <div className="pinning-item">
          <h2>Create Pin</h2>
          <ul className="errors">
            {hasSubmitted && validationErrors.length > 0 && validationErrors.map((error, idx) => (
              <li key={idx}><i class="fa-sharp fa-solid fa-circle-exclamation"></i> {error}</li>
            ))}
          </ul>
          {/* <input
            type="text"
            value={boardId}
            onChange={(e) => setBoardId(e.target.value)}
            placeholder='Board Id'
          /> */}
          <select className='select'
            onChange={e => setBoardId(e.target.value)}
            value={boardId}
          >
            {boards.map(board => (
              <option key={board.id} value={board.id}>{board.name}</option>
            ))}
          </select>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Title'
            maxLength="30"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Tell everyone what your pin is about'
            maxLength="255"
          />
          <input
            type="url"
            value={pinImage}
            onChange={(e) => setPinImage(e.target.value)}
            placeholder='Preview image url'
          />
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  )
}

export default CreatePinForm