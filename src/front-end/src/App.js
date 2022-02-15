import React from 'react'
import './assets/css/App.css'
import { Route, Switch } from 'react-router-dom'
import { CreateUser, LoginUser, Tasks } from './pages'

function App () {
  return (
    <Switch>
      <Route exact path='/' component={LoginUser} />
      <Route exact path='/createUser' component={CreateUser} />
      <Route exact path='/tasks' component={Tasks} />
    </Switch>
  )
}

export default App
