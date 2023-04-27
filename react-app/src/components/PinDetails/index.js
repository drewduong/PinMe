import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getPinsThunk } from '../../store/pins';
import { deletePinThunk } from '../../store/pins';
import { followThunk, unfollowThunk } from '../../store/session';
import { NavLink } from 'react-router-dom';
import './PinDetails.css';

const defaultImage = 'https://cdn-icons-png.flaticon.com/512/1201/1201519.png'

const PinDetails = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { pinId } = useParams()
  const [isLoaded, setIsLoaded] = useState(false)
  // const [hasSubmitted, setHasSubmitted] = useState(false)

  const user = useSelector(state => state.session.user)
  console.log('User details: ', user)
  const following = user.following
  console.log('Current session user following list: ', following)
  const pin = useSelector(state => state.pins[+pinId])
  // console.log('Pin details', pin)
  const isPinOwner = user?.id === pin?.user.id
  const pinOwner = pin?.user
  const isFollowing = following?.find(following => following === pinOwner?.username)
  // console.log('Pin owner user id: ', pinOwner)

  const followUser = async () => {
    await dispatch(followThunk(pinOwner.id))
    // setHasSubmitted(!hasSubmitted)

  }

  const unfollowUser = async () => {
    await dispatch(unfollowThunk(pinOwner.id))
    // setHasSubmitted(!hasSubmitted)
  }

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
            </NavLink>) : (null)}

            {isPinOwner ? (<button className='delete-board-button' onClick={async () => {
              const deletedPin = await dispatch(deletePinThunk(pinId))
              if (deletedPin) history.push('/discover')
            }}><i class="fa-solid fa-trash-can"></i></button>) : (null)}
          </div>
          <div className='pin-second-div'>
            <h4>{pin?.user.username}</h4>
            {isFollowing ? (<button className='unfollow-button' onClick={unfollowUser}>Unfollow</button>) : (
              <button className='follow-button' onClick={followUser}>Follow</button>)}

          </div>
          <div className='pin-third-div'>
            <h2>{pin?.title}</h2>
          </div>
          <div className='pin-fourth-div'>
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

export default PinDetails

