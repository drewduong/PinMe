import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../../store/session';
import './LoginForm.css'

const LoginForm = ({ setShowModal }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const error = []
  // const onLogin = async (e) => {
  //   e.preventDefault();
  //   const data = await dispatch(login(email, password));
  //   if (data) {
  //     setErrors(data);
  //   }
  // };

  // Handling login modal logic
  const onLogin = async (e) => {
    e.preventDefault();
    if (!email.includes('@')) error.push('Valid email is required')
    if (error.length) return setErrors(error)

    const data = await dispatch(login(email, password));
    // Check how to add
    // setShowModal(true)

    if (data) {
      setErrors(data);
    }
    return data
  };

  const demoUser = async (e) => {
    e.preventDefault();
    await dispatch(login("demo@aa.io", "password"))
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-container'>
      <form onSubmit={onLogin}>
        <div className='login-item'>
          <h2>Login</h2>
          <ul className='errors'>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </ul>
          <input
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
          />
          <button type="submit">Login</button>
          <button type="submit" onClick={demoUser}>Demo</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
