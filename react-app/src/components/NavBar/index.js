
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'

const NavBar = () => {
  return (
    // <nav>
    <ul className='nav-bar-container'>
      {/* <li>
        <NavLink className='home-button' to='/' exact={true} activeClassName='active'>
          <i class="fa-solid fa-house"></i>
        </NavLink>
      </li> */}
      <li>
        <NavLink to='/discover' exact={true} activeClassName='active'>
          <img className='logo' src='https://imgur.com/a/oLcAlo7' alt='logo' />
        </NavLink>
      </li>
      <div className='right-nav'>
        <li>
          <NavLink className='login-button' to='/login' exact={true} activeClassName='active'>
            <i class="fa-solid fa-right-to-bracket"></i>
          </NavLink>
        </li>
        <li>
          <NavLink className='signup-button' to='/sign-up' exact={true} activeClassName='active'>
            <i class="fa-solid fa-user-plus"></i>
          </NavLink>
        </li>
        {/* <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li> */}
        <li>
          <NavLink className='boards-button' to='/boards' exact={true} activeClassName='active'><i class="fa-solid fa-clipboard"></i>
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </div>
    </ul>
    // </nav>
  );
}

export default NavBar;
