import React from 'react';
import styles from '@/styles/Auth.module.css';

export default function SignUp() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>#Hello #Welcome</h1>
      <form className={styles.form}>
        <label className={styles.label}>#Enter Your Email</label>
        <input type="email" placeholder="User Id / Email" className={styles.input} />
        <label className={styles.label}>#Create Your Password</label>
        <input type="password" placeholder="Password" className={styles.input} />
        <label className={styles.label}>#Enter Your Address</label>
        <input type="text" placeholder="Address" className={styles.input} />
        <label className={styles.label}>#Enter Your Number</label>
        <input type="text" placeholder="Number" className={styles.input} />
        <button type="submit" className={styles.button}>#SIGN UP</button>
      </form>
    </div>
  );
}