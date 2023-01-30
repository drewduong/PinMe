
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';

const NavBar = () => {
  return (
    // <nav>
    <ul className='nav-bar-container'>
      <li>
        <NavLink to='/' exact={true} activeClassName='active'>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to='/login' exact={true} activeClassName='active'>
          Login
        </NavLink>
      </li>
      <li>
        <NavLink to='/sign-up' exact={true} activeClassName='active'>
          Sign Up
        </NavLink>
      </li>
      <li>
        <NavLink to='/users' exact={true} activeClassName='active'>
          Users
        </NavLink>
      </li>
      <li>
        <NavLink to='/boards' exact={true} activeClassName='active'>
          Boards, Don't Click When Not Logged In
        </NavLink>
      </li>
      <li>
        <LogoutButton />
      </li>
    </ul>
    // </nav>
  );
}

export default NavBar;
