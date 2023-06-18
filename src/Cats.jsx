import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function Cats() {
  const [cats, setCats] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCats, setFilteredCats] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3002`)
      .then(result => {
        setCats(result.data);
        setFilteredCats(result.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3002/deleteCat/${id}`)
      .then(res => {
        console.log(res);
        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    filterCats(event.target.value);
  };

  const filterCats = (searchTerm) => {
    const filteredCats = cats.filter(cat => {
      const catName = cat.name.toLowerCase();
      const catBreed = cat.breed.toLowerCase();
      const catAge = cat.age.toString();
      const catGender = cat.gender.toLowerCase();
      const searchTermLower = searchTerm.toLowerCase();
  
      return (
        catName.includes(searchTermLower) ||
        catBreed.includes(searchTermLower) ||
        catAge.includes(searchTermLower) ||
        catGender.includes(searchTermLower)
      );
    });
  
    setFilteredCats(filteredCats);
  };
  

  return (
    <div>
      <div>
        <Link to="/create" className="btn_add">Add Cat</Link>
        <input
          type="text"
          placeholder="Search cats by name"
          value={searchTerm}
          onChange={handleSearch}
        />
        <table className="table">
          <thead>
            <tr>
              <th>Cat Picture</th>
              <th>Name</th>
              <th>Breed</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCats.map(cat => (
              <tr key={cat._id}>
                <td>
                {cat.image && <img src={`http://localhost:3002/uploads/${cat.image}`} alt={cat.name} style={{ width: '50px', height: '50px' }} />}
                </td>
                <td>{cat.name}</td>
                <td>{cat.breed}</td>
                <td>{cat.age}</td>
                <td>{cat.gender}</td>
                <td>
                  <Link to={`/update/${cat._id}`}>Edit</Link> |{' '}
                  <button onClick={() => handleDelete(cat._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Cats;

