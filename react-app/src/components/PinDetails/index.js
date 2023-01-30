import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getPinsThunk } from '../../store/pins';
import { deletePinThunk } from '../../store/pins';
import { NavLink } from 'react-router-dom';
import './PinDetails.css';

const BoardDetails = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { pinId } = useParams()
  const [isLoaded, setIsLoaded] = useState(false)

  const pin = useSelector(state => state.pins[+pinId])
  // console.log('Board details', pin)

  useEffect(() => {
    dispatch(getPinsThunk(+pinId))
      .then(() => setIsLoaded(true))
  }, [dispatch, pinId])

  return isLoaded && (
    <div>
      <div>
        <NavLink to={`/pins/${pinId}/edit`}>
          Edit
        </NavLink>
      </div>
      <div>
        <button onClick={async () => {
          const deletedPin = await dispatch(deletePinThunk(pinId))
          if (deletedPin) history.push('/discover')
        }}>Delete</button>
      </div>
    </div>
  )
}

export default BoardDetails

