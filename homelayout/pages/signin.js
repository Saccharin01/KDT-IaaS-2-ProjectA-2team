import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/Auth.module.css';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      router.push('/');
    } catch (error) {
      console.error('Login failed:', error);
      // 추가: 오류 메시지를 표시할 수 있음
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>#Welcome #Back</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="User Id / Email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className={styles.button}>#SIGN IN</button>
      </form>
      <div className={styles.links}>
        <a href="#" className={styles.link}>#Forgot Password?</a>
        <a href="/signup" className={styles.link}>#Create Your Account</a>
      </div>
    </div>
  );
}