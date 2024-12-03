import './App.css';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import Upload from './pages/upload';
import Home from './pages/Home';

function App() {
  return (
    <div className="container">
      <Router>
        <nav className="nav">
          <div className="nav-brand">Cloudinary Demo</div>
          <ul className="nav-items">
            <li className="nav-item">
              <Link to="/">Gallery</Link>
            </li>
            <li className="nav-item">
              <Link to="/upload">Upload</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/upload" element={<Upload />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
