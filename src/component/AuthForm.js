import React, { useState } from 'react';

export default function AuthForm(props) {
    const [form, setForm] = useState({
    name: '',
    password: '',
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setForm((prevForm) => ({...prevForm, [name]: value}));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onSub({
      login: form.name,
      password: form.password,
    });

    setForm({
      name: '',
      password: '',
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Username" />
      <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" />
      <button type="submit" >Login</button>
    </form>
  );
}