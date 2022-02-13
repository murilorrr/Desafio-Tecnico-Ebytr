import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { loginUser, tokenValidate } from "../api/api";


const warningVisibleStyle = {backgroundColor: "red", position: "absolute", top: 0, visibility: 'visible'}
const warningNonVisibleStyle = {backgroundColor: "red", position: "absolute", top: 0, visibility: 'hidden'}

const LoginUser = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [warning, setWarning] = useState("");
  const [lockButton, setLockButton] = useState(true);

  let history = useHistory();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    if (name === "email") return setEmail(value);
    if (name === "password") return setPassword(value);
  };

  const validateToken = async (token) => {
    const { error } = await tokenValidate({
      token: token
    });
    if (error) {
      setWarning(error);
      return false;
    }
    return true;
  }

  useEffect(() => {
    const token = localStorage.getItem("token") || undefined;
    if (token) {
      const tokenValid = validateToken(token);
      tokenValid ? history.push('tasks'): localStorage.clear();
    }
  }, [history]);

  const validateLogin = (email, password) => {
    const minPasswordLength = 6;

    const validadeEmail = email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    const validatePass = password.length >= minPasswordLength;
    return validadeEmail && validatePass;
  };

  useEffect(() => {
    if (validateLogin(email, password)) {
      setLockButton(false);
    } else {
      setLockButton(true);
    }
  }, [email, password]);

  const loginUserFunction = async() => {
    const { error, data } = await loginUser({
      email: email,
      password: password,
    });
    if (!error) {
      localStorage.setItem("token", JSON.stringify(data));
      history.push("tasks");
      return;
    }
    setWarning(error);
    return;
  }

  return (
    <div className="wrapper">
      <div className="login-img" />
      <div className="login-form-div">
        <div className="login-form-and-greetings">
        {
          <div style={warning===''? warningNonVisibleStyle: warningVisibleStyle}>WARNING: {warning}</div>
        }
          <p className="greetings">Welcome back</p>
          <h2 className="login-header">Login to your account</h2>
          <div className="login-form">
            <form>
              <div className="form-group">
                <label htmlFor="InputEmail">Email</label>
                <input
                  data-testid='input-Email'
                  type="email"
                  name="email"
                  onChange={handleChange}
                  className="form-control"
                  value={email}
                  id="InputEmail"
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="InputPassword">Password</label>
                <input
                  data-testid='input-Password'
                  type="password"
                  name="password"
                  onChange={handleChange}
                  className="form-control"
                  value={password}
                  id="InputPassword"
                  placeholder="Enter Password"
                />
              </div>
            </form>
          </div>
          <button
            type="submit"
            data-testid='submit-button'
            disabled={lockButton}
            onClick={loginUserFunction}
            className="btn submit-button"
          >
            Login now
          </button>
        </div>
        <p id="create-link">
          Don't have an account yet? <Link to={"createUser"}>Join today</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginUser;
