import { Route, Routes, Navigate } from "react-router-dom";
import Signup from "./components/Singup";
import Admin from "./components/Admin";

function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			<Route path="/registration" exact element={<Signup />} />
			<Route path="/result" exact element={<Admin />} />
			<Route path="/" element={<Navigate replace to="/Signup" />} />
		</Routes>
	);
}

export default App;
