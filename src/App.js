import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Sign from "./Components/SignIn";
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard";
import Reset from "./Components/Reset";
import News from "./HolderPages/NewsHolder";
import NewsHolder from "./HolderPages/NewsHolder";
import Events from "./Pages/Events";

export default function App() {
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
			</Routes>
		</Router>
	);
}
