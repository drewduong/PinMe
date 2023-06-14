
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
// import {useLocation} from 'react-router-dom'
import LogoutButton from '../auth/LogoutButton';
// import Search from '../Search';
import './NavBar.css'

const NavBar = () => {
  // const location = useLocation()
  const user = useSelector(state => state.session.user)

  const loggedOut = () => (
    <ul className='logged-out-container'>
      <div className='logged-out-left-nav'>
        <img className='logged-out-logo' src='https://i.imgur.com/gbDA1SY.png' alt='logo' />
        <h3>PinMe</h3>
      </div>
      <div className='logged-out-right-nav'>
        <div className='logged-out-socials'>
          <a id='socials' href='https://drewduong.github.io/' target='_blank' rel='noreferrer'>Portfolio</a>
          <a id='socials' href='https://github.com/drewduong' target='_blank' rel='noreferrer'>Github</a>
          <a id='socials' href='https://www.linkedin.com/in/andrewrduong' target='_blank' rel='noreferrer'>LinkedIn</a>
        </div>
        <div className='logged-out-buttons'>
          <NavLink className='login-button' to='/login' exact={true} activeClassName='active'>Log in</NavLink>
          <NavLink className='signup-button' to='/sign-up' exact={true} activeClassName='active'>Sign Up</NavLink>
        </div>
      </div>
    </ul>
  )

  const loggedIn = () => (
    // <nav>
    <ul className='nav-bar-container'>
      {/* <li>
        <NavLink className='home-button' to='/' exact={true} activeClassName='active'>
          <i class="fa-solid fa-house"></i>
        </NavLink>
      </li> */}
      <div className='left-nav'>
        <li>
          <NavLink to='/discover' exact={true} activeClassName='active'>
            <img className='logo' src='https://i.pinimg.com/originals/1b/76/01/1b7601e035a83c13c208b4ec905ee6d9.png' alt='logo' />
          </NavLink>
        </li>
        <li>
          <NavLink className='home-button' to='/discover' exact={true} activeClassName='active'>
            {/* <i class="fa-solid fa-thumbtack"></i> */}
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className='new-pin-button' to='/pins/create' exact={true} activeClassName='active'>
            {/* <i class="fa-solid fa-thumbtack"></i> */}
            Create
          </NavLink>
        </li>
      </div>
      {/* <div className='center-nav'>
        {user && location.pathname === '/discover' ? (<Search />) : (null)}
      </div> */}
      <div className='right-nav'>
        <li>
          {user ? (null) : (<NavLink className='login-button' to='/login' exact={true} activeClassName='active'>
            {/* <i class="fa-solid fa-user"></i> */}
            Login
          </NavLink>)}
        </li>
        <li>
          {user ? (null) : (<NavLink className='signup-button' to='/sign-up' exact={true} activeClassName='active'>
            {/* <i class="fa-solid fa-user-plus"></i> */}
            Sign Up
          </NavLink>)}
        </li>
        <li>
          <a className='github-button' href='https://github.com/drewduong'>
            <i class="fa-brands fa-github"></i>
          </a>
        </li>
        <li>
          <a className='linkedin-button' href='https://www.linkedin.com/in/andrewrduong'>
            <i class="fa-brands fa-linkedin-in"></i>
          </a>
        </li>
        <li>
          {user ? (<NavLink className='profile-button' to={`/users/${user?.id}`} exact={true} activeClassName='active'>
            <i id='profile' class="fa-solid fa-user"></i>
          </NavLink>) : (null)}
        </li>
        <li>
          {user ? (<LogoutButton />) : (null)}
        </li>
      </div>
    </ul>
    // </nav>
  );

  return user ? loggedIn() : loggedOut()
}

export default NavBar;
