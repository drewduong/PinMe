import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import './LandingPage.css';

const defaultImage = 'https://cdn-icons-png.flaticon.com/512/1201/1201519.png'

const LandingPage = () => {
  const user = useSelector(state => state.session.user);

  if (user) {
    return <Redirect to='/discover' />;
  }

  return (
    <div className="landing-container">
      <div className="landing-left-div">
        <div className='landing-image-div'>
          <img className='landing-image'
            onError={e => {
              if (e.target.src !== defaultImage) {
                e.target.src = defaultImage
              }
            }}
            src='https://i.imgur.com/2KAc9Uy.png' alt='No Preview' />
        </div>
      </div>
      <div className="landing-right-div">
        <div className='landing-text-div'>
          <div className='landing-text-title'>Search for an idea</div>
          <div className='landing-text-description'>What do you want to try next? Think of something you’re into—like “quick easy recipes”—and see what you find.</div>
          <NavLink className='explore-button' to={'/login'}>Explore</NavLink>
        </div>
      </div>
    </div>
  )
}

export default LandingPage