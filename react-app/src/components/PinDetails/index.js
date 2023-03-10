import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getPinsThunk } from '../../store/pins';
import { deletePinThunk } from '../../store/pins';
import { NavLink } from 'react-router-dom';
import './PinDetails.css';

const defaultImage = 'https://cdn-icons-png.flaticon.com/512/1201/1201519.png'

const BoardDetails = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { pinId } = useParams()
  const [isLoaded, setIsLoaded] = useState(false)

  const user = useSelector(state => state.session.user)
  console.log('User details', user)
  const pin = useSelector(state => state.pins[+pinId])
  console.log('Pin details', pin)
  const isPinOwner = user?.id === pin?.user.id

  useEffect(() => {
    dispatch(getPinsThunk(+pinId))
      .then(() => setIsLoaded(true))
  }, [dispatch, pinId])

  return isLoaded && (
    <div className='pin-outter-container'>
      <div className='pin-top-container'>
        {/* <div className='pin-left-div'> */}
        <img className='pin-image'
          onError={e => {
            if (e.target.src !== defaultImage) {
              e.target.src = defaultImage
            }
          }}
          src={pin?.pin_image} alt='None' />
        {/* </div> */}
        <div className='pin-description'>
          <div className='pin-first-div'>
            {isPinOwner ? (<NavLink className='edit-board-button' to={`/pins/${pinId}/edit`}>
              <i class="fa-solid fa-ellipsis"></i>
            </NavLink>) : (<h4 className='errors'><i class="fa-sharp fa-solid fa-circle-exclamation"></i> Unable to edit</h4>)}

            {isPinOwner ? (<button className='delete-board-button' onClick={async () => {
              const deletedPin = await dispatch(deletePinThunk(pinId))
              if (deletedPin) history.push('/discover')
            }}><i class="fa-solid fa-trash-can"></i></button>) : (<h4 className='errors'><i class="fa-sharp fa-solid fa-circle-exclamation"></i> Unable to delete</h4>)}
          </div>
          <div className='pin-second-div'>
            <h2>{pin?.title}</h2>
          </div>
          <div className='pin-third-div'>
            <h4>{pin?.description}</h4>
          </div>
        </div>
      </div>
      <div className='pin-bottom-container'>
        <div className='pin-bottom-first-div'>
          <h2>More Projects Like This</h2>
        </div>
        <div className='project-item'>
          <a className='airbnb' href='https://beautifuldestinations.onrender.com/'>
            <img className='project-image' src='https://webdesignledger.com/wp-content/uploads/2015/09/00-featured-airbnb-pink-logomark.jpg' alt='No Preview' />
          </a>
          <a className='github' href='https://github.com/drewduong'>
            <img className='project-image' src='https://logodownload.org/wp-content/uploads/2019/08/github-logo.png' alt='No Preview' />
          </a>
          <a className='stackoverflow' href='https://stack-underflow-x2ou.onrender.com/	'>
            <img className='project-image' src='https://i.pinimg.com/736x/36/30/9f/36309f22e4c16447b085400be01bbc1e.jpg' alt='No Preview' />
          </a>
        </div>
      </div>
    </div>
  )
}

export default BoardDetails

