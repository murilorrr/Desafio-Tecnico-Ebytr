import React, { useCallback, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { loginUser, tokenValidate } from '../api/api'
import Warning from '../components/warning'

const LoginUser = () => {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [warning, setWarning] = useState('')
  const [lockButton, setLockButton] = useState(true)

  const history = useHistory()

  const handleChange = ({ target }) => {
    const { name, value } = target
    if (name === 'email') return setEmail(value)
    if (name === 'password') return setPassword(value)
  }

  const validateToken = async (string) => {
    const { error } = await tokenValidate(string)
    if (error) {
      return false
    }
    return true
  }

  const memoizedCallback = useCallback(async () => {
    const token = localStorage.getItem('token') || undefined
    const tokenIsValid = await validateToken(token)
    tokenIsValid ? history.push('tasks') : localStorage.clear()
  }, [history])

  useEffect(() => {
    memoizedCallback()
  }, [memoizedCallback])

  const validateLogin = (email, password) => {
    const minPasswordLength = 6

    const validadeEmail = email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    const validatePass = password.length >= minPasswordLength
    return validadeEmail && validatePass
  }

  useEffect(() => {
    if (validateLogin(email, password)) {
      setLockButton(false)
    } else {
      setLockButton(true)
    }
  }, [email, password])

  const loginUserFunction = async () => {
    const { error, data } = await loginUser({
      email: email,
      password: password
    })
    if (!error) {
      localStorage.setItem('token', data.token)
      history.push('tasks')
      return
    }
    setWarning(error)
    setTimeout(() => {
      setWarning('')
    }, 3000)
  }

  return (
    <div className='wrapper'>
      <div className='login-img' />
      <div className='login-form-div'>
        <div className='login-form-and-greetings'>
          <Warning warning={warning}/>
          <p className='greetings'>Welcome back</p>
          <h2 className='login-header'>Login to your account</h2>
          <div className='login-form'>
            <form>
              <div className='form-group'>
                <label htmlFor='InputEmail'>Email</label>
                <input
                  data-testid='input-Email'
                  type='email'
                  name='email'
                  onChange={handleChange}
                  className='form-control'
                  value={email}
                  id='InputEmail'
                  placeholder='Enter email'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='InputPassword'>Password</label>
                <input
                  data-testid='input-Password'
                  type='password'
                  name='password'
                  onChange={handleChange}
                  className='form-control'
                  value={password}
                  id='InputPassword'
                  placeholder='Enter Password'
                />
              </div>
            </form>
          </div>
          <button
            type='submit'
            data-testid='submit-button'
            disabled={lockButton}
            onClick={loginUserFunction}
            className='btn submit-button'
          >
            Login now
          </button>
        </div>
        <p id='create-link'>
          Don't have an account yet? <Link to='createUser'>Join today</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginUser
