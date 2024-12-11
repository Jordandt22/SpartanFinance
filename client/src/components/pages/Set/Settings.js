import React, { useState } from 'react';

import "./Settings.css";

const SettingsPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Here you can add logic to handle the form submission,
    // e.g., send the data to the server.

    setError('');
    setSuccess('Changes saved successfully!');
  };

  return (
      <div className="settings-container">
        <h1>Account Settings</h1>
        <form onSubmit={handleSubmit} className="settings-form">
          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}

          <div className="form-box">
            <h2>Username</h2>
            <div className="form-group">
              <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter new username"
                  value={formData.username}
                  onChange={handleChange}
                  required
              />
            </div>
          </div>

          <div className="form-box">
            <h2>Email</h2>
            <div className="form-group">
              <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter new email"
                  value={formData.email}
                  onChange={handleChange}
                  required
              />
            </div>
          </div>

          <div className="form-box">
            <h2>Password</h2>
            <div className="form-group">
              <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter new password"
                  value={formData.password}
                  onChange={handleChange}
                  required
              />
            </div>
          </div>

          <div className="form-box">
            <h2>Confirm Password</h2>
            <div className="form-group">
              <input
                  type="password"
                  id="confirm-password"
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
              />
            </div>
          </div>

          <button type="submit" className="submit-btn">Save Changes</button>
        </form>
      </div>
  );
};

export default SettingsPage;
