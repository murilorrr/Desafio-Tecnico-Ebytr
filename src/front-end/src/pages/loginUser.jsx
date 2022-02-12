import React from 'react';
import { Link } from 'react-router-dom';

const loginUser = () => {
  return (
    <div className='wrapper'>
      <div className='login-img' />
      <div className='login-form-div'>
        <div className='login-form-and-greetings'>
          <p className='greetings'>Welcome back</p>
          <h2 className='login-header'>Login to your account</h2>
          <div className='login-form'>
            <form >
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
          <button type="submit" class="btn submit-button">Login now</button>
        </div>
        <p id='create-link'>Don't have an account yet? <Link to={'tasks'}>Join today</Link></p>
      </div>
    </div>
  );
}

export default loginUser;
