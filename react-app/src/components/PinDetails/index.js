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
    <div className='pin-container'>
      {/* <div className='pin-left-div'> */}
      <img className='pin-image' src={pin?.pin_image} alt='None' />
      {/* </div> */}
      <div className='pin-description'>
        <div className='pin-first-div'>
          <NavLink className='edit-board-button' to={`/pins/${pinId}/edit`}>
            <i class="fa-solid fa-ellipsis"></i>
          </NavLink>
          <button className='delete-board-button' onClick={async () => {
            const deletedPin = await dispatch(deletePinThunk(pinId))
            if (deletedPin) history.push('/discover')
          }}><i class="fa-solid fa-trash-can"></i></button>
        </div>
        <div className='pin-second-div'>
          <h2>{pin.title}</h2>
        </div>
        <div className='pin-third-div'>
          <h4>{pin.description}</h4>
        </div>
      </div>
    </div>
  )
}

export default BoardDetails

