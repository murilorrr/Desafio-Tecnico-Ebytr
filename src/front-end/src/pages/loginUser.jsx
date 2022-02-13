import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const LoginUser = () => {
  useEffect(() => {
    getToken();
  }, []);
  const getToken = () => {
    return {};
  }
  return (
    <div className='wrapper'>
      <div className='login-img' />
      <div className='login-form-div'>
        <div className='login-form-and-greetings'>
          <p className='greetings'>Welcome back</p>
          <h2 className='login-header'>Login to your account</h2>
          <div className='login-form'>
            <form >
              <div className="form-group">
                <label htmlFor="InputEmail">Email</label>
                <input type="email" className="form-control" id="InputEmail" placeholder="Enter email" />
              </div>
              <div className="form-group">
                <label htmlFor="InputPassword">Password</label>
                <input type="password" className="form-control" id="InputPassword" placeholder="Enter Password" />
              </div>
            </form>
          </div>
          <button type="submit" className="btn submit-button">Login now</button>
        </div>
        <p id='create-link'>Don't have an account yet? <Link to={'createUser'}>Join today</Link></p>
      </div>
    </div>
  );
}

export default LoginUser;
