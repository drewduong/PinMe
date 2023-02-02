import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const user = useSelector(state => state.session.user)

  return (
    <div className="landing-container">
      <div className="landing-left-div">
        <div className='landing-image-div'>
          <img className='landing-image' src='https://i.imgur.com/vs116YR.png' alt='No Preview' />
        </div>
      </div>
      <div className="landing-right-div">
        <div className='landing-text-div'>
          <h1 className='landing-text-title'>Search for an idea</h1>
          What do you want to try next? Think of something you’re into—like “quick easy recipes”—and see what you find
          <NavLink className='explore-button' to={'/login'}>Explore</NavLink>
        </div>
      </div>
    </div>
  )
}

export default LandingPage