import React, { useState } from 'react';
import axios from 'axios';
import { validateEmail } from '../utils';

const Home = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPW, setInvalidPW] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { history } = props;

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post('/login', { email, password })
      .then(({ data }) => {
        if (data.user_token) {
          history.push('/my-list');
        } else if (data.code === 'Error') {
          setErrorMsg(data.message);
        }
      });
  };

  return (
    <div className="page-container">
      <div>
        <h1>Rapptr Labs</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="icon">
            <label><b>Email</b></label>
            <input
              maxLength="25"
              className={invalidEmail ? 'invalid-input' : ''}
              type="text"
              placeholder="user@rapptrlabs.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (!validateEmail(e.target.value)) setInvalidEmail(true);
                else setInvalidEmail(false);
              }}
            />
            <i className="fa fa-user fa-lg" />
          </div>
          <p className={invalidEmail ? '' : 'hide-text'}>Email is invalid</p>
          <div className="icon">
            <label><b>Password</b></label>
            <input
              className={invalidPW ? 'invalid-input' : ''}
              type="password"
              placeholder="Must be at least 4 characters"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (e.target.value.length < 4) setInvalidPW(true);
                else setInvalidPW(false);
              }}
            />
            <i className="fa fa-lock fa-lg" />
          </div>
          <p className={invalidPW ? 'show-text' : 'hide-text'}>Password is invalid</p>
          <button type="submit" disabled={!!(invalidEmail || invalidPW || email.length === 0 || password.length === 0)}>Login</button>
          <p className={errorMsg.length > 0 ? 'show-text' : 'hide-text'}>{errorMsg}</p>
        </form>
      </div>
    </div>
  );
};
export default Home;
