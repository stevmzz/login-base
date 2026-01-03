import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login.jsx';
import { Register } from './pages/Register.jsx';

/**
 * This component serves as the entry point of the app.
 * It sets up routing between Login and Register pages.
 *
 * @function App
 * @returns {JSX.Element} The root application component with routing
 */
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

// Export the App component as the default export
export default App;