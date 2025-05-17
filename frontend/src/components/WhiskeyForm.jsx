import { useState } from 'react';
import axios from 'axios';

export default function WhiskeyForm({ token, onAdd }) {
  const [form, setForm] = useState({
    name: '',
    distillery: '',
    type: '',
    age: '',
    proof: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:5000/whiskeys/', form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onAdd(res.data); // Optionally refetch or update state
      setForm({
        name: '',
        distillery: '',
        type: '',
        age: '',
        proof: ''
      });
    } catch (err) {
      console.error(err);
      alert("Failed to add whiskey.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add a New Whiskey</h3>
      <input
        placeholder='Name'
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder='Distillery'
        value={form.distillery}
        onChange={(e) => setForm({ ...form, distillery: e.target.value })}
      />
      <input
        placeholder='Type'
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value })}
      />
      <input
        placeholder='Age'
        type='number'
        value={form.age}
        onChange={(e) => setForm({ ...form, age: e.target.value })}
      />
      <input
        placeholder='Proof'
        type='number'
        value={form.proof}
        onChange={(e) => setForm({ ...form, proof: e.target.value })}
      />
      <button type='submit'>Add Whiskey</button>
    </form>
  );
}
