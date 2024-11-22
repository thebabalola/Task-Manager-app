import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send a request to your server to authenticate the user
    console.log('Login attempt', { email, password });
    
    // For demo purposes, we'll just set a token in localStorage
    localStorage.setItem('token', 'demo_token');
    alert('Login successful!');
    navigate('/dashboard');
  };

  return (
    <div className="page-container">
      <nav>
        <div className="logo">TaskMaster</div>
        <Link to="/">
          <button>Home</button>
        </Link>
      </nav>
      <div className="container">
        <div className="card">
          <h1>Login to TaskMaster</h1>
          <p className="subtitle">Enter your credentials to access your account</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary"> Log In</button>
          </form>
          <p className="text-center">
            Don't have an account? <Link to="/register" className="link">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;