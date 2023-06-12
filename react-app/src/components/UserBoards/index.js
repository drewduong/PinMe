import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserBoardsThunk } from '../../store/boards';
import { getFollowsThunk } from '../../store/follows'
import { NavLink, useParams } from 'react-router-dom';
import './UserBoards.css';

const defaultImage = 'https://cdn-icons-png.flaticon.com/512/1201/1201519.png'

const UserBoards = () => {
  const dispatch = useDispatch()
  const { userId } = useParams()
  const [isLoaded, setIsLoaded] = useState(false)

  const user = useSelector(state => state.session.user)
  // console.log('Current user state (useSelector):', user)
  const boards = useSelector(state => Object.values(state.boards))
  // console.log('Current user boards (useSelector):', boards)
  const followersCount = useSelector(state => Object.keys(state.follows.followers).length)
  const followingCount = useSelector(state => Object.keys(state.follows.following).length)
  // console.log('Current user followers (useSelector):', followersCount)
  // console.log('Current users following (useSelector):', followingCount)

  /* Passive data: dispatch within useEffect
  Active data, dispatch within onSubmit */

  useEffect(() => {
    dispatch(getUserBoardsThunk())
      .then(() => setIsLoaded(true))
  }, [dispatch])

  useEffect(() => {
    dispatch(getFollowsThunk(userId))
      .then(() => setIsLoaded(true))
  }, [dispatch, userId])

  if (!boards) return (<h3>Currently no boards</h3>)

  return isLoaded && (
    <div className='boards-container'>
      <div className='user-name'>
        <h1>{user.first_name} {user.last_name}</h1>
      </div>
      <div className='user-username'>
        @{user.username}
      </div>
      <div className='user-about'>
        {user.about}
      </div>
      <div className='user-follows'>
        <NavLink className='user-followers-navlink' to={`/users/${user.id}/followers`}>{followersCount} followers</NavLink>-
        <NavLink className='user-following-navlink' to={`/users/${user.id}/following`}>{followingCount} following</NavLink>
      </div>
      <div className='user-profile'>
        <button className='edit-user-profile-button'>
          <NavLink className='edit-user-navlink' to={`/users/${user.id}/edit`}>Edit Profile</NavLink>
        </button>
      </div>
      <div className='boards-new'>
        <button className='new-board-button'>
          <NavLink className='new-board-link' to={'/boards/create'}><i class="fa-solid fa-plus"></i></NavLink>
        </button>
      </div>
      {boards.map(board => (
        <div className='boards-item'>
          <NavLink to={`/boards/${board.id}`}>
            <img className='boards-image'
              onError={e => {
                if (e.target.src !== defaultImage) {
                  e.target.src = defaultImage
                }
              }}
              src={board.board_image} alt='No Preview' />
          </NavLink>
          <div className='boards-description'>
            <div className='boards-name'>
              {board.name}
            </div>
            <div className='boards-total-pins'>
              {/* Insert total pins Number of pins */}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default UserBoards