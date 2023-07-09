import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getUserBoardsThunk } from '../../store/boards';
import { getPinsThunk, deletePinThunk, createPinThunk } from '../../store/pins';
import { followThunk, unfollowThunk } from '../../store/follows';
import { NavLink } from 'react-router-dom';
import './PinDetails.css';

const defaultImage = 'https://cdn-icons-png.flaticon.com/512/1201/1201519.png'

const PinDetails = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { pinId } = useParams()

  const user = useSelector(state => state.session.user)
  const pins = useSelector(state => state.pins[+pinId])
  // console.log('pin details: ', pin)
  const boards = useSelector(state => Object.values(state.boards))
  const isPinOwner = user?.id === pins?.user.id
  const pinOwner = pins?.user
  // const isFollowing = following?.find(following => following.id === pinOwner?.id)
  const following = useSelector(state => state.follows.following)
  const isFollowing = Object.keys(following)

  const [boardId, setBoardId] = useState(boards[0]?.id)
  const [isLoaded, setIsLoaded] = useState(false)

  const handleSavingPin = async (e) => {
    e.preventDefault()

    const pin = {
      title: pins.title,
      description: pins.description,
      pin_image: pins.pin_image,
      user_id: user?.id,
      board_id: pins.board_id,
      // pin_id: pinId
    }

    await dispatch(createPinThunk(pin))
    history.push('/discover')
  }
  const handleFollowing = async (e) => {
    e.preventDefault()

    const newFollower = {
      follower_id: user?.id,
      followed_id: pinOwner?.id
    }

    await dispatch(followThunk(newFollower))
    // await dispatch(getFollowsThunk(pinOwner.id))
  }

  const handleUnfollowing = async (e) => {
    e.preventDefault()

    const removedFollower = {
      follower_id: user?.id,
      followed_id: pinOwner?.id
    }

    await dispatch(unfollowThunk(removedFollower))
    // await dispatch(getFollowsThunk(pinOwner.id))
  }

  useEffect(() => {
    dispatch(getPinsThunk(+pinId))
      .then(() => setIsLoaded(true))
  }, [dispatch, pinId])

  useEffect(() => {
    dispatch(getUserBoardsThunk())
      .then(() => setIsLoaded(true))
  }, [dispatch])

  // useEffect(() => {
  //   dispatch(getFollowsThunk(pinOwner?.id))
  // }, [dispatch, pinOwner.id])

  if (!boards) return (<h3>Currently no boards</h3>)


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
          src={pins?.pin_image} alt='None' />
        {/* </div> */}
        <div className='pin-description'>
          <div className='pin-first-row'>
            <div className='edit-delete-button-div'>
              {isPinOwner ? (<NavLink className='edit-board-button' to={`/pins/${pinId}/edit`}>
                <i className="fa-solid fa-ellipsis"></i>
              </NavLink>) : (null)}

              {isPinOwner ? (<button className='delete-board-button' onClick={async () => {
                const deletedPin = await dispatch(deletePinThunk(pinId))
                if (deletedPin) history.push('/discover')
              }}><i className="fa-solid fa-trash-can"></i></button>) : (null)}
            </div>
            <form handleSavingPin={handleSavingPin}>
              <select className='select'
                onChange={e => setBoardId(e.target.value)}
                value={boardId}
              >
                {boards.map(board => (
                  <option key={board.id} value={board.id}>{board.name}</option>
                ))}
              </select>
              <button className='save-pin-button' type="submit">Save</button>
            </form>
          </div>
          <div className='pin-third-div'>
            <h2>{pins?.title}</h2>
            <h4>{pins?.description}</h4>
          </div>
          <div className='pin-fourth-div'>
            <h4>{pins?.user.username}</h4>
            {isFollowing.includes(pinOwner?.id.toString()) ? (<button className='unfollow-button' onClick={handleUnfollowing}>Unfollow</button>) : (
              <button className='follow-button' onClick={handleFollowing}>Follow</button>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PinDetails

