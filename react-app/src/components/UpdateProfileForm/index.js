import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { updateProfileThunk } from '../../store/users';
import './UpdateProfileForm.css';

const UpdateProfileForm = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { userId } = useParams()

  const user = useSelector(state => state.session.user)
  // const boards = useSelector(state => Object.values(state.boards))
  // const pin = useSelector(state => state.pins[+pinId])
  // console.log('Current pin details (useSelector):', board)

  const [firstName, setFirstName] = useState(user.first_name || '')
  const [lastName, setLastName] = useState(user.last_name || '')
  const [about, setAbout] = useState(user.about || '')
  // const [isLoaded, setIsLoaded] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [validationErrors, setValidationErrors] = useState([])

  /* Passive data: dispatch within useEffect
     Active data, dispatch within onSubmit */


  // useEffect(() => {
  // dispatch(updateProfileThunk())
  // .then(() => setIsLoaded(true))
  // }, [dispatch])

  useEffect(() => {
    const errors = []

    if (firstName.length > 30) errors.push("First name must be less than 30 characters")
    if (lastName.length > 30) errors.push("First name must be less than 30 characters")
    if (about.length > 255) errors.push("About me section must be less than 255 characters")

    setValidationErrors(errors)
  }, [firstName, lastName, about])

  const onSubmit = async (e) => {
    e.preventDefault()
    setHasSubmitted(true)

    if (!validationErrors.length) {
      user.first_name = firstName
      user.last_name = lastName
      user.about = about

      const updatedProfile = await dispatch(updateProfileThunk(user, userId))
      if (updatedProfile) history.push(`/profile`)
    }
  }

  if (!user) return (<h3>Currently no user logged in</h3>)

  return (
    <div className="profile-container">
      <form onSubmit={onSubmit} hasSubmitted={hasSubmitted}>
        <div className="profile-item">
          <h2>Public profile</h2>
          <h4>People visiting your profile will see the following info</h4>
          <ul className="errors">
            {hasSubmitted && validationErrors.length > 0 && validationErrors.map((error, idx) => (
              <li key={idx}><i class="fa-sharp fa-solid fa-circle-exclamation"></i> {error}</li>
            ))}
          </ul>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder='First Name'
            maxLength="30"
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder='Last Name'
            maxLength="30"
          />
          <input
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder='About Me'
          />
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  )
}

export default UpdateProfileForm