import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createPinThunk } from '../../store/pins';
import './CreatePinForm.css';

const CreatePinForm = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const user = useSelector(state => state.session.user)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [pinImage, setPinImage] = useState("")
  const [boardId, setBoardId] = useState("")
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const [validationErrors, setValidationErrors] = useState([])

  /* Passive data: dispatch within useEffect
     Active data, dispatch within onSubmit */

  useEffect(() => {
    const errors = []

    if (!title) errors.push("Title of board is required")
    if (title.length > 30) errors.push("Title must be less than 30 characters")
    if (!pinImage) errors.push("Image url is required")
    if (!boardId) errors.push("Board Id is required")

    setValidationErrors(errors)
  }, [title, pinImage, boardId])

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

      dispatch(createPinThunk(pin))
      history.push('/discover')
    }
  }

  return (
    <div className="boarding-container">
      <form onSubmit={onSubmit} hasSubmitted={hasSubmitted}>
        <div className="boarding-item">
          <h2>Create Pin</h2>
          <ul className="errors">
            {hasSubmitted && validationErrors.length > 0 && validationErrors.map((error, idx) => (
              <li key={idx}><i class="fa-sharp fa-solid fa-circle-exclamation"></i> {error}</li>
            ))}
          </ul>
          <input
            type="text"
            value={boardId}
            onChange={(e) => setBoardId(e.target.value)}
            placeholder='Add your board id'
          />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Add your title'
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Tell everyone what your pin is about'
          />
          <input
            type="url"
            value={pinImage}
            onChange={(e) => setPinImage(e.target.value)}
            placeholder='Add your preview image url'
          />
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  )
}

export default CreatePinForm