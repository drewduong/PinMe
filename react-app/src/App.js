import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginFormModal/LoginForm';
import SignUpForm from './components/auth/SignUpFormModal/SignUpForm';
import NavBar from './components/NavBar/index';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
// Import remaining components
import UserBoards from './components/UserBoards/index'
import CreateBoardForm from './components/CreateBoardForm';
import UpdateBoardForm from './components/UpdateBoardForm'
import BoardDetails from './components/BoardDetails';
import AllPins from './components/AllPins';
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
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <h1>Not Logged In Homescreen</h1>
        </Route>
        <ProtectedRoute path='/discover' exact={true} >
          <AllPins />
        </ProtectedRoute>
        <ProtectedRoute path='/boards' exact={true}>
          <UserBoards />
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
      </Switch>
    </BrowserRouter>
  );
}

export default App;
