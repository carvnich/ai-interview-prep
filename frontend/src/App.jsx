import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Home/Dashboard.jsx';
import InterviewPrep from './pages/InterviewPrep/InterviewPrep.jsx';
import LandingPage from './pages/LandingPage.jsx';
import { Toaster } from "react-hot-toast";
import UserProvider from "./context/userContext.jsx";

function App() {
	return (
		<UserProvider>
			<div>
				<Router>
					<Routes>
						{/* Default Route */}
						<Route path="/" element={<LandingPage />} />
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/interview-prep/:sessionId" element={<InterviewPrep />} />
					</Routes>
					<Toaster toastOptions={{ style: { fontSize: "13px" }, success: { icon: '✅' }, error: { icon: '❌' }, }} />
				</Router>
			</div>
		</UserProvider>
	);
}

export default App;