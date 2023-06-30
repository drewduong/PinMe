import { React, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import { Modal } from '../../context/Modal'
import './LandingPage.css';

const defaultImage = 'https://cdn-icons-png.flaticon.com/512/1201/1201519.png'

const LandingPage = () => {
  const history = useHistory()
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false)
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password))

    if (data) {
      setErrors(data);
    }
  };

  const demoUser = async (e) => {
    e.preventDefault();
    await dispatch(login("demo@aa.io", "password"))
      .then(() => history.push('/discover'))
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };


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
          <button className='explore-button' onClick={() => { setShowModal(true) }}>Explore</button>
          {showModal && (
            <Modal id='border-modal' onClose={() => {
              setShowModal(false)
            }}>
              <div className='login-container'>
                <form onSubmit={onLogin}>
                  <div className='login-item'>
                    <img className='logged-out-logo' src='https://i.imgur.com/gbDA1SY.png' alt='logo' />
                    <div id='modal-header'>Welcome to PinMe</div>
                    <div id='modal-header-2'>Find new ideas to try</div>
                    <ul className='errors'>
                      {errors.map((error, ind) => (
                        <div key={ind}><i class="fa-sharp fa-solid fa-circle-exclamation"></i> {error}</div>
                      ))}
                    </ul>
                    <label>
                      Email
                      <input
                        name='email'
                        type='text'
                        placeholder='Email'
                        value={email}
                        onChange={updateEmail}
                      />
                    </label>
                    <label>
                      Password
                      <input
                        name='password'
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={updatePassword}
                      />
                    </label>
                    <button type="submit">Log in</button>
                    <button type="submit" onClick={demoUser}>Demo</button>
                  </div>
                </form>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </div>
  )
}

export default LandingPage