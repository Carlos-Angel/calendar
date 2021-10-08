import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { startChecking } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, uid } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  if (checking) {
    return <h5>Cargando...</h5>;
  }

  return (
    <Router>
      <div>
        <Switch>
          <PrivateRoute
            exact
            path='/'
            component={CalendarScreen}
            isLogged={uid ? true : false}
          />
          <PublicRoute
            exact
            path='/login'
            component={LoginScreen}
            isLogged={uid ? true : false}
          />
          <Redirect to='/' />
        </Switch>
      </div>
    </Router>
  );
};
