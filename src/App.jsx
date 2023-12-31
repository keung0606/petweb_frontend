import { useEffect, useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Cats from './Cats';
import CreateCat from './CreateCat';
import UpdateCat from './UpdateCat';
import Login from './Login';
import Register from './Register';
import ViewCats from './viewCats';
import Message from './Message';
import UpdateMessage from './UpdateMessage';
import SendMessage from './CreateMessage';
import ViewMessage from './viewMessage';

function App() {
  const isAuthenticated = true;
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Cats />} />
          <Route path="/create" element={<CreateCat />} />
          <Route path="/update/:id" element={<UpdateCat />} />
          <Route path="/viewCats" element={<ViewCats />} />
          <Route path="/messages" element={<Message />} />
          <Route path="/updateMessage/:id" element={<UpdateMessage />} />
          <Route path="/sendMessage" element={<SendMessage />} />
          <Route path="/viewMessage" element={<ViewMessage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
