import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';


import Sign from './Components/SignIn';
import Register from './Components/Register';
import Dashboard from './Components/Dashboard';
import Reset from './Components/Reset';
import Events from './Components/Events';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Sign />} />;
        <Route path="/dash" element={<Dashboard title="Dashboard"/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/events" element={<Events />} />
      </Routes>
    </Router>
  );
}