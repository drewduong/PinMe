import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getFollowsThunk } from '../../store/follows'
import { NavLink } from 'react-router-dom';
import './UserFollowers.css';

const UserFollowers = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { userId } = useParams()

  const [isLoaded, setIsLoaded] = useState(false)

  /* Subscribe to the store and listen to changes in the spots slice of state.
  newState is an object containing all spots, which can't be mapped over, it needs to be converted to an array */

  const user = useSelector(state => state.session.user)
  const userFollowers = useSelector(state => Object.values(state.follows.followers))
  console.log('Current users followwers (useSelector):', userFollowers)

  /* Passive data: dispatch within useEffect
  Active data, dispatch within onSubmit */

  useEffect(() => {
    dispatch(getFollowsThunk(userId))
      .then(() => setIsLoaded(true))
  }, [dispatch, userId])


  /* Conditional used to debug if it's not rendering correctly */
  if (!Object.keys(userFollowers).length) return (<h3>Currently, no followers found</h3>)

  return isLoaded && (
    <div className='follows-container'>
      {userFollowers.map(follower => (
        <div key={follower.id} className='follows-item'>
          <h3>{follower.username}</h3>
        </div>
      ))}
    </div>

  )
}

export default UserFollowers