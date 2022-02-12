import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { CreateUser, LoginUser } from './pages'

function App() {
  return (
    <Switch>
      <Route exact path="/" component={LoginUser}></Route>
      <Route exact path="/createUser" component={CreateUser}></Route>
    </Switch>
  );
}

export default App;
