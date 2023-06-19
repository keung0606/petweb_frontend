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
  const [image, setImage] = useState('');

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
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('gender', gender);
      formData.append('age', age);
      formData.append('breed', breed);
      if (image) {
        formData.append('image', image);
      }

      await axios.put(`http://localhost:3002/updateCat/${id}`, formData);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h2>Update Cat</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Gender:
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>
        <br />
        <label>
          Age:
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Breed:
          <input
            type="text"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Image:
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </label>
        <br />
        <button type="submit" className="btn-primary">Update</button>
      </form>
    </div>
  );
}

export default UpdateCat;

