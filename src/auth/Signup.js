import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [form, setForm] = useState({
    name: '',
    age: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const validate = () => {
    if (!form.name || !form.age || !form.password || !form.confirmPassword) {
      return 'Name, age, password, and confirm password are required.';
    }
    if (form.password.length < 8 || !/[!@#$%^&*(),.?":{}|<>]/.test(form.password)) {
      return 'Password must be at least 8 characters and contain at least one special character.';
    }
    if (form.password !== form.confirmPassword) {
      return 'Passwords do not match.';
    }
    if (parseInt(form.age, 10) >= 20 && !form.mobile) {
      return 'Mobile number is required for users age 20 or above.';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/user-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          age: form.age,
          mobile: form.mobile,
          email: form.email,
          password: form.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Signup failed');
      setSuccess('Signup successful!');
      setForm({ name: '', age: '', mobile: '', email: '', password: '', confirmPassword: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '2rem auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <h2>Sign Up</h2>
      <input name="name" placeholder="Name*" value={form.name} onChange={handleChange} required />
      <input name="age" type="number" placeholder="Age*" value={form.age} onChange={handleChange} required />
      <input name="mobile" placeholder="Mobile Number" value={form.mobile} onChange={handleChange} />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <input name="password" type="password" placeholder="Password*" value={form.password} onChange={handleChange} required />
      <input name="confirmPassword" type="password" placeholder="Confirm Password*" value={form.confirmPassword} onChange={handleChange} required />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
      <button type="submit">Sign Up</button>
      <p>Already have an account? <Link to="/login">Go to Login</Link></p>
    </form>
  );
};

export default Signup;
