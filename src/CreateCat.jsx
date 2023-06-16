import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateCat() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const cat = { name, breed, age, gender };

    axios.post('http://localhost:3002/createCat', cat)
      .then(res => {
        console.log(res);
        navigate('/');
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h2>Add Cat</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" required onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Breed:</label>
          <input type="text" required onChange={(e) => setBreed(e.target.value)} />
        </div>
        <div>
          <label>Age:</label>
          <input type="number" required onChange={(e) => setAge(e.target.value)} />
        </div>
        <div>
          <label>Gender:</label>
          <select required onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <button type="submit">Add Cat</button>
        </div>
      </form>
    </div>
  );
}

export default CreateCat;

