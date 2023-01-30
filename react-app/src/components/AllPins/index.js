import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPinsThunk } from '../../store/pins';
import { NavLink } from 'react-router-dom';
import './AllPins.css';

const AllPins = () => {
  const dispatch = useDispatch()

  const pins = useSelector(state => Object.values(state.pins))
  // console.log('Get all pins state (useSelector)', pins)

  useEffect(() => {
    dispatch(getPinsThunk())
  }, [dispatch])

  if (!pins) return (<h1>No pins found</h1>)

  return (
    <div className='discover-container'>
      {pins.map(pin => (
        <div className='discover-item'>
          <NavLink to={`/pins/${pin.id}`}>
            <img className='discover-image' src={pin.pin_image} alt='No Preview' />
          </NavLink>
        </div>
      ))}
    </div>
  )
}

export default AllPins