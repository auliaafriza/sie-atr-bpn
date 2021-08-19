import React from 'react';
import './index.css';
import Login from './pages/loginPage/login';
import Dashboard from './pages/dashboardPage/dashboard';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/Login">
          <Login />
        </Route>
        <Route path="/Dashboard">
          <Dashboard />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}
