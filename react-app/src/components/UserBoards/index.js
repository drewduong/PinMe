import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getUserBoardsThunk } from '../../store/boards';
import { NavLink } from 'react-router-dom';
import './UserBoards.css';

const UserBoards = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [isLoaded, setIsLoaded] = useState(false)

  const user = useSelector(state => state.session.user)
  const boards = useSelector(state => Object.values(state.boards))
  console.log('Current user boards (useSelector):', boards)

  /* Passive data: dispatch within useEffect
  Active data, dispatch within onSubmit */

  useEffect(() => {
    dispatch(getUserBoardsThunk())
      .then(() => setIsLoaded(true))
  }, [dispatch])

  if (!boards) return (<h3>Currently no boards</h3>)

  return isLoaded && (
    <div className='boards-container'>
      {/* <div>
        <NavLink to={'/boards/new'}>Create New Board</NavLink>
      </div> */}
      {boards.map(board => (
        <div className='boards-item'>
          <NavLink to={`/boards/${board.id}`}>
            <img className='boards-image' src={board.board_image} alt='No Preview' />
          </NavLink>
          <div className='boards-description'>
            <div className='boards-name'>
              {board.name}
            </div>
            <div className='boards-total-pins'>
              {/* Insert total pins */} Number of pins
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default UserBoards