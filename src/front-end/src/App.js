import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { createUser, loginUser } from './pages'

function App() {
  return (
    <Switch>
      <Route exact path="/" component={loginUser}></Route>
      <Route exact path="/createUser" component={createUser}></Route>
    </Switch>
  );
}

export default App;
