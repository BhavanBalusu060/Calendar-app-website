import { React, Fragment } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

import Sign from './Components/SignIn';
import Register from './Components/Register';
import Dashboard from './Components/Dashboard';
import Reset from './Components/Reset';
import EventsHolder from './HolderPages/EventsHolder';
import News from './HolderPages/NewsHolder';
import NewsHolder from './HolderPages/NewsHolder';

export default function App() {

  return (
    <Router className="division">
      <Routes>
        <Route exact path="/" element={<Sign />} />;
        <Route exact path="/dash" element={<Dashboard title="Dashboard" />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/reset" element={<Reset />} />
        <Route exact path="/events" element={<EventsHolder title="Manage Events" />} />
        <Route exact path="/news" element={<NewsHolder title="Manage News" />} />
      </Routes>

    </Router>
  );
}