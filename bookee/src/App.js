import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import MyShifts from './components/MyShifts';
import AvailableShifts from './components/AvailableShifts';
import './App.css';

function App() {
  return (
    <Router>
     <div className="app">
        <nav className="nav-tabs">
          <NavLink
            exact
            to="/"
            activeClassName="active-tab"
            className="tab-link"
          >
            My Shifts
          </NavLink>
          <NavLink
            to="/available"
            activeClassName="active-tab"
            className="tab-link"
          >
            Available Shifts
          </NavLink>
        </nav>
        
        <Routes>
          <Route path="/" element={<MyShifts />} />
          <Route path="/available" element={<AvailableShifts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
