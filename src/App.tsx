import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import CareerPathPage from './pages/CareerPathPage';
import CareerPathDetailPage from './pages/CareerPathDetailPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/career-path" element={<CareerPathPage />} />
        <Route path="/career-path/:domainId/:subDomainId" element={<CareerPathDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;