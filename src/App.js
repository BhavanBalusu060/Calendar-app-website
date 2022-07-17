<<<<<<< HEAD
import { React, Fragment } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
=======
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
>>>>>>> 667c8830b1df1069435cd44eaab2889224e898b4

import Sign from "./Components/SignIn";
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard";
import Reset from "./Components/Reset";
import News from "./HolderPages/NewsHolder";
import NewsHolder from "./HolderPages/NewsHolder";
import Events from "./Pages/Events";
import Weather from "./Pages/Weather";

export default function App() {
<<<<<<< HEAD

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
=======
	return (
		<Router className="division">
			<Routes>
				<Route path="/" element={<Sign />} />;
				<Route path="/dash" element={<Dashboard title="Dashboard" />} />
				<Route path="/register" element={<Register />} />
				<Route path="/reset" element={<Reset />} />
				<Route
					path="/events"
					element={<Events title="Manage Events" />}
				/>
				<Route
					path="/news"
					element={<NewsHolder title="Manage News" />}
				/>
				<Route path="/weather" element={<Weather />} />;
			</Routes>
		</Router>
	);
}
>>>>>>> 667c8830b1df1069435cd44eaab2889224e898b4
