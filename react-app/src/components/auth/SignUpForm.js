import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { signUp } from '../../store/session';
import { Modal } from '../../context/Modal'
import './SignUpForm.css'


const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [showModal, setShowModal] = useState(false)
  const dispatch = useDispatch();

  const error = []
  const onSignUp = async (e) => {
    e.preventDefault();
    if (!email.includes('@')) error.push('Valid email is required')
    if (password !== repeatPassword) error.push('Double check confirmed password')
    if (error.length) return setErrors(error)
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
      return data
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  return (
    <>
      <button className='signup-button' onClick={() => { setShowModal(true) }}>Sign up</button>
      {showModal && (
        <Modal id='border-modal' onClose={() => {
          setShowModal(false)
        }}>
          <div className='signup-container'>
            <form onSubmit={onSignUp}>
              <div className='signup-item'>
                <img className='logged-out-logo' src='https://i.imgur.com/gbDA1SY.png' alt='logo' />
                <div id='modal-header'>Welcome to PinMe</div>
                <div id='modal-header-2'>Find new ideas to try</div>
                <ul className='errors'>
                  {errors.map((error, ind) => (
                    <div key={ind}><i class="fa-sharp fa-solid fa-circle-exclamation"></i> {error}</div>
                  ))}
                </ul>
                <label>
                  Username
                  <input
                    type='text'
                    name='username'
                    placeholder='Username'
                    onChange={updateUsername}
                    value={username}
                  />
                </label>
                <label>
                  Email
                  <input
                    type='text'
                    name='email'
                    placeholder='Email'
                    onChange={updateEmail}
                    value={email}
                  />
                </label>
                <label>
                  Password
                  <input
                    type='password'
                    name='password'
                    placeholder='Create a password'
                    onChange={updatePassword}
                    value={password}
                  />
                </label>
                <label>
                  Confirm Password
                  <input
                    type='password'
                    name='repeat_password'
                    placeholder='Repeat Password'
                    onChange={updateRepeatPassword}
                    value={repeatPassword}
                    required={true}
                  />
                </label>
                <button type='submit'>Continue</button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
};

export default SignUpForm;
