import React, { useState } from 'react';
import '../../css/styles.css';  // Ensure your styles are linked

interface LoginPageProps {
  onLogin: (token: string, companyID: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5001/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('authToken', `Bearer ${data.token}`);
        localStorage.setItem('companyID', data.company_id.toString());
        onLogin(data.token, data.company_id);
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error("Login error:", error);
      alert('Failed to login. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Welcome Back 👋</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="login-button" type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default LoginPage;