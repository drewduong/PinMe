
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
      <div className='left-nav'>
        <li>
          <NavLink to='/discover' exact={true} activeClassName='active'>
            <img className='logo' src='https://i.pinimg.com/originals/1b/76/01/1b7601e035a83c13c208b4ec905ee6d9.png' alt='logo' />
          </NavLink>
        </li>
        <li>
          <NavLink className='new-pin-button' to='/pins/create' exact={true} activeClassName='active'>
            <i class="fa-solid fa-pinball"></i>
          </NavLink>
        </li>
      </div>
      <div className='right-nav'>
        <li>
          <NavLink className='login-button' to='/login' exact={true} activeClassName='active'>
            <i class="fa-solid fa-user"></i>
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
