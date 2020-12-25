import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/Dashboard';
import Navigation from './components/Navigation';
import { history } from './history'



const Routes  = () => {
    return (
      <Router history={history}>
        <div className="container">
            <Navigation></Navigation>
          <Switch>
            <Route exact path='/' component={ Dashboard } />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Register} />
          </Switch>
        </div>
      </Router>
      
    );
}

export default Routes;