import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { updatePinThunk } from '../../store/pins';
import './UpdatePinForm.css';

const UpdatePinForm = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { pinId } = useParams()

  const user = useSelector(state => state.session.user)
  const pin = useSelector(state => state.pins[+pinId])
  // console.log('Current pin details (useSelector):', board)

  const [boardId, setBoardId] = useState(pin.board_id)
  const [title, setTitle] = useState(pin.title)
  const [description, setDescription] = useState(pin.description)
  const [pinImage, setPinImage] = useState(pin.pin_image)
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const [validationErrors, setValidationErrors] = useState([])

  /* Passive data: dispatch within useEffect
     Active data, dispatch within onSubmit */

  useEffect(() => {
    const errors = []

    if (!boardId) errors.push("Board id is required")
    if (!title) errors.push("Title of board is required")
    if (title.length > 30) errors.push("Title must be less than 30 characters")
    if (!description) errors.push("Pin description is required")
    if (description.length > 255) errors.push("Pin description must be less than 255 characters")
    if (!pinImage) errors.push("Image url is required")

    setValidationErrors(errors)
  }, [boardId, title, description, pinImage])

  const onSubmit = async (e) => {
    e.preventDefault()
    setHasSubmitted(true)

    if (!validationErrors.length) {
      pin.board_id = boardId
      pin.title = title
      pin.description = description
      pin.pin_image = pinImage

      dispatch(updatePinThunk(pin, pinId))
      history.push(`/pins/${pinId}`)
    }
  }

  return (
    <div className="pinning-container">
      <form onSubmit={onSubmit} hasSubmitted={hasSubmitted}>
        <div className="pinning-item">
          <h2>Update Pin</h2>
          <ul className="errors">
            {hasSubmitted && validationErrors.length > 0 && validationErrors.map((error, idx) => (
              <li key={idx}><i class="fa-sharp fa-solid fa-circle-exclamation"></i> {error}</li>
            ))}
          </ul>
          <input
            type="text"
            value={boardId}
            onChange={(e) => setBoardId(e.target.value)}
            placeholder='Board Id'
          />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Title'
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
            placeholder='Preview image url'
          />
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  )
}

export default UpdatePinForm