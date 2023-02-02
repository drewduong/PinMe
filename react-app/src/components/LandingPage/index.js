import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const user = useSelector(state => state.session.user)

  return (
    <div className="boarding-container">
      <div className="boarding-item">
        <h1>Search for an Idea.</h1>
        <div>What do you want to try next? Think of something you’re into—like “easy chicken dinner”—and see what you find.</div>
        <NavLink className='explore-button' to={'/login'}>Explore PinMe</NavLink>
      </div>
    </div>
  )
}

export default LandingPage