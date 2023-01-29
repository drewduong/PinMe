import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
// Import get pins thunk
// import { getBoardThunk } from '../../store/boards';
import { deleteBoardThunk } from '../../store/boards';
import { NavLink } from 'react-router-dom';
import './BoardDetails.css';

const BoardDetails = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { boardId } = useParams()
  // const [isLoaded, setIsLoaded] = useState(false)

  const board = useSelector(state => state.boards[+boardId])
  // console.log('Board details', board)

  useEffect(() => {
    // dispatch(getBoardThunk(+boardId))
    // .then(() => setIsLoaded(true))
  }, [dispatch, boardId])

  return (
    <div>
      <div>
        <NavLink to={`/boards/${boardId}/edit`}>
          Edit
        </NavLink>
      </div>
      <div>
        <button onClick={async () => {
          const deletedBoard = await dispatch(deleteBoardThunk(boardId))
          if (deletedBoard) history.push('/boards')
        }}>Delete</button>
      </div>
    </div>
  )
}

export default BoardDetails

