import React, { useState } from 'react';
import './AuthForm.css';

const AuthForm = ({ type, onSubmit }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    ...(type === 'signup' && { confirmPassword: '' })
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === 'signup' && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    onSubmit(formData);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>{type === 'login' ? 'Login' : 'Sign Up'}</h2>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      {type === 'signup' && (
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      )}

      <button type="submit">{type === 'login' ? 'Login' : 'Sign Up'}</button>
    </form>
  );
};

export default AuthForm;
