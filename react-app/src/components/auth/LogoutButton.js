import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/session';
import './LogoutButton.css'

const LogoutButton = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const onLogout = async (e) => {
    e.preventDefault()
    dispatch(logout());
    history.push('/')
  };

  return <button className='logout-button' onClick={onLogout}><i class="fa-solid fa-right-to-bracket"></i></button>;

};

export default LogoutButton;
