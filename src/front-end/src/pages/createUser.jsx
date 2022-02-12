import React from 'react'
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types'

const createUser = () => {
  return (
    <div className='wrapper'>
      <div className='login-img' />
      <div className='login-form-div'>
        <div className='login-form-and-greetings'>
          <p className='greetings'>Welcome</p>
          <h2 className='login-header'>Create your account</h2>
          <div className='login-form'>
            <form >
              <div class="form-group">
                <label for="InputName">Name</label>
                <input type="name" class="form-control" id="InputName" placeholder="Enter your first name" />
              </div>
              <div class="form-group">
                <label for="InputEmail">Email</label>
                <input type="email" class="form-control" id="InputEmail" placeholder="Enter email" />
              </div>
              <div class="form-group">
                <label for="InputPassword">Password</label>
                <input type="password" class="form-control" id="InputPassword" placeholder="Enter Password" />
              </div>
            </form>
          </div>
          <button type="submit" class="btn submit-button">Create account</button>
        </div>
        <p id='login-link'>Already have an account? <Link to={'/'}>Log in</Link></p>
      </div>
    </div>
  )
}

// createUser.propTypes = {}

export default createUser