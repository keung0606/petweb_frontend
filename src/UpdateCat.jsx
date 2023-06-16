import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateCat() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3002/getCat/${id}`)
      .then(res => {
        const cat = res.data;
        setName(cat.name);
        setBreed(cat.breed);
        setAge(cat.age);
        setGender(cat.gender);
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cat = { name, breed, age, gender };

    axios.put(`http://localhost:3002/updateCat/${id}`, cat)
      .then(res => {
        console.log(res);
        navigate('/');
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h2>Update Cat</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" required value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Breed:</label>
          <input type="text" required value={breed} onChange={(e) => setBreed(e.target.value)} />
        </div>
        <div>
          <label>Age:</label>
          <input type="number" required value={age} onChange={(e) => setAge(e.target.value)} />
        </div>
        <div>
          <label>Gender:</label>
          <select required value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <button type="submit">Update Cat</button>
        </div>
      </form>
    </div>
  );
}

export default UpdateCat;

