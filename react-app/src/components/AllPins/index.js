import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPinsThunk } from '../../store/pins';
import { NavLink } from 'react-router-dom';
import './AllPins.css';

const defaultImage = 'https://cdn-icons-png.flaticon.com/512/1201/1201519.png'

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
      <div className='discover-top-div'><h4>Interact With User Pins By Clicking Below</h4></div>
      {pins.map(pin => (
        <div className='discover-item'>
          <NavLink to={`/pins/${pin.id}`}>
            <img className='discover-image'
              onError={e => {
                if (e.target.src !== defaultImage) {
                  e.target.src = defaultImage
                }
              }}
              src={`${pin.pin_image}`} alt='No Preview' />
          </NavLink>
        </div>
      ))}
    </div>
  )
}

export default AllPins