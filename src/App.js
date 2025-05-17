import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListingAppLauncher from './pages/ListingAppLauncher';
import AddSettings from './pages/AddSettings';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<ListingAppLauncher />} />
          <Route path="/settings" element={<AddSettings />} />
        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
