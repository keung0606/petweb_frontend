import { useEffect, useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Cats from './Cats';
import CreateCat from './CreateCat';
import UpdateCat from './UpdateCat';
import Login from './Login';
import Register from './Register';

function App() {
  const isAuthenticated = true;
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Cats />} />
          <Route path="/create" element={<CreateCat />} />
          <Route path="/update/:id" element={<UpdateCat />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
