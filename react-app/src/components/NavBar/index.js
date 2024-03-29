
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
// import {useLocation} from 'react-router-dom'
import LoginForm from '../auth/LoginForm';
import SignUpForm from '../auth/SignUpForm';
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
        <a id='socials' href='https://drewduong.github.io/' target='_blank' rel='noreferrer'>Portfolio</a>
        <a id='socials' href='https://github.com/drewduong' target='_blank' rel='noreferrer'>Github</a>
        <a id='socials' href='https://www.linkedin.com/in/andrewrduong' target='_blank' rel='noreferrer'>LinkedIn</a>
        <LoginForm />
        <SignUpForm />
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
            <img className='logged-in-logo' src='https://i.imgur.com/gbDA1SY.png' alt='logo' />
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
          <NavLink className='profile-button' to={`/users/${user?.id}`} exact={true} activeClassName='active'>
            <i id='profile' class="fa-solid fa-user"></i>
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </div>
    </ul>
    // </nav>
  );

  return user ? loggedIn() : loggedOut()
}

export default NavBar;
