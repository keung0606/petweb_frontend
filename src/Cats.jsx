import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Cats() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3002')
      .then(result => setCats(result.data))
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

  return (
    <div>
      <div>
        <Link to="/create" className="btn_add">Add Cat</Link>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Breed</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cats.map(cat => (
              <tr key={cat._id}>
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
