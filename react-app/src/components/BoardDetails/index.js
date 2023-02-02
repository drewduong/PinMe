import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getPinsThunk } from '../../store/pins';
import { deleteBoardThunk } from '../../store/boards';
import { NavLink } from 'react-router-dom';
import './BoardDetails.css';

const defaultImage = 'https://cdn-icons-png.flaticon.com/512/1201/1201519.png'

const BoardDetails = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [isLoaded, setIsLoaded] = useState(false)
  const { boardId } = useParams()

  const board = useSelector(state => state.boards[+boardId])
  // console.log('Board details', board)
  const allPins = useSelector(state => Object.values(state.pins))
  const pins = allPins.filter(pin => pin?.board_id === board?.id)
  // console.log('All pins in database', allPins)
  // console.log('Pins associated with current board id', pins)

  useEffect(() => {
    dispatch(getPinsThunk())
      .then(() => setIsLoaded(true))
  }, [dispatch, boardId])


  if (!pins) return null

  return isLoaded && (
    <div className='board-container'>
      <div className='board-top-div'>
        <h1 className='board-name'>{board?.name}</h1>
      </div>
      <div className='board-third-div'><h4>{pins?.length} Pins, Board ID: {board?.id}</h4></div>
      <div className='board-fourth-div'>
        <NavLink className='edit-board-button' to={`/boards/${boardId}/edit`}>
          <i class="fa-solid fa-ellipsis"></i>
        </NavLink>

        <button className='delete-board-button' onClick={async () => {
          const deletedBoard = await dispatch(deleteBoardThunk(boardId))
          if (deletedBoard) history.push('/boards')
        }}><i class="fa-solid fa-trash-can"></i></button>

      </div>
      {pins.map(pin => (
        <div className='pins-item'>
          <NavLink to={`/pins/${pin.id}`}>
            <img className='pins-image'
              onError={e => {
                if (e.target.src !== defaultImage) {
                  e.target.src = defaultImage
                }
              }}
              src={pin?.pin_image} alt='No Preview' />
          </NavLink>
        </div>
      ))}
      {/* <div>
        <button onClick={async () => {
          const deletedBoard = await dispatch(deleteBoardThunk(boardId))
          if (deletedBoard) history.push('/boards')
        }}>Delete</button>
      </div> */}
    </div>
  )
}

export default BoardDetails

