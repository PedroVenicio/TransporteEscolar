import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Login.module.css';
import logo3 from '../ft/logo3.png';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


export default function Login() {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  async function loginAction(event) {
    event.preventDefault();
    try{
      const response = await axios.post('http://localhost:3000/login',
        {
          login, senha: password
        }
      )
      const { access_token } = response.data;
      localStorage.setItem('token', access_token);
      const decodedToken = jwtDecode(access_token)
      if (decodedToken.adm === true) {
        navigate('/Home')
      }
    } catch(error){
        alert("Não foi possível logar")
        console.log("não foi possivel logar: ", error)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.meio}>
        <div className={styles.loginBox}>
          <div className={styles.text}>Realize seu login!</div>
          <form onSubmit={loginAction}>
            <div className={styles.inputGroup}>
              <input
                type="login"
                id="login"
                required
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
              <label htmlFor="login">login</label>
            </div>
            <div className={styles.inputGroup}>
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password">Senha</label>
            </div>
            <button type="submit" className={styles.LoginButton}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
