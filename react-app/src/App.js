import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginFormModal/LoginFormModal';
import SignUpForm from './components/auth/SignUpFormModal/SignUpFormModal';
import NavBar from './components/NavBar/index';
import ProtectedRoute from './components/auth/ProtectedRoute';
// import UsersList from './components/UsersList';
// import User from './components/User';
// Import remaining components
import UserBoards from './components/UserBoards/index'
import CreateBoardForm from './components/CreateBoardForm';
import UpdateBoardForm from './components/UpdateBoardForm'
import BoardDetails from './components/BoardDetails';
import AllPins from './components/AllPins';
import CreatePinForm from './components/CreatePinForm'
import PinDetails from './components/PinDetails'
import UpdatePinForm from './components/UpdatePinForm'
import UpdateProfileForm from './components/UpdateProfileForm';
import LandingPage from './components/LandingPage'
import UserFollowers from './components/UserFollowers';
import UserFollowing from './components/UserFollowing';
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        {/* <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute> */}
        {/* <ProtectedRoute path='/users/:userId' exact={true} >
          <User /> */}
        {/* </ProtectedRoute> */}
        <Route path='/' exact={true} >
          <LandingPage />
        </Route>
        <ProtectedRoute path='/discover' exact={true} >
          <AllPins />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true}>
          <UserBoards />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId/edit' exact={true}>
          <UpdateProfileForm />
        </ProtectedRoute>
        <ProtectedRoute path='/boards/create' exact={true}>
          <CreateBoardForm />
        </ProtectedRoute>
        <ProtectedRoute path='/boards/:boardId' exact={true}>
          <BoardDetails />
        </ProtectedRoute>
        <ProtectedRoute path='/boards/:boardId/edit' exact={true}>
          <UpdateBoardForm />
        </ProtectedRoute>
        <ProtectedRoute path='/pins/create' exact={true}>
          <CreatePinForm />
        </ProtectedRoute>
        <ProtectedRoute path='/pins/:pinId' exact={true}>
          <PinDetails />
        </ProtectedRoute>
        <ProtectedRoute path='/pins/:pinId/edit' exact={true}>
          <UpdatePinForm />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId/followers' exact={true}>
          <UserFollowers />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId/following' exact={true}>
          <UserFollowing />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
