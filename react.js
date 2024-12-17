import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = ({ userId }) => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  const fetchWallet = async () => {
    const res = await axios.get(`/api/users/${userId}/wallet`);
    setBalance(res.data.balance);
    setTransactions(res.data.transactions);
  };

  useEffect(() => {
    fetchWallet();
  }, []);

  return (
    <div>
      <h1>Wallet Balance: ${balance}</h1>
      <ul>
        {transactions.map((tx, idx) => (
          <li key={idx}>{tx.type}: ${tx.amount}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;

import React, { useState } from 'react';
import axios from 'axios';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async () => {
    const url = isLogin ? '/api/users/login' : '/api/users/register';
    const payload = isLogin ? { email, password } : { name, email, password };
    try {
      const res = await axios.post(url, payload);
      alert(isLogin ? 'Logged in' : 'Registered');
      console.log(res.data);
    } catch (error) {
      alert('Error: ' + error.response.data.message);
    }
  };

  return (
    <div>
      <h1>{isLogin ? 'Login' : 'Register'}</h1>
      {!isLogin && <input placeholder="Name" onChange={(e) => setName(e.target.value)} />}
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSubmit}>{isLogin ? 'Login' : 'Register'}</button>
      <p onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'New? Register here' : 'Already have an account? Login'}
      </p>
    </div>
  );
};

export default Auth;

