import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Login.module.css';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function loginAction(e) {
    e.preventDefault();
    console.log('Login attempted with:', email, password);
    navigate('/Home');
  }

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <div className={styles.text}>Realize seu login!</div>
        <form onSubmit={loginAction}>
          <div className={styles.inputGroup}>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className={styles.inputGroup}>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password">Password</label>
          </div>
          <button type="submit" className={styles.LoginButton}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}