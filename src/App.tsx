import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import CareerPathPage from './pages/CareerPathPage';
import CareerPathDetailPage from './pages/CareerPathDetailPage';
import StudentDashboard from './pages/StudentDashboard';
import ChatbotModal from './components/chatbot/ChatbotModal';
import Navbar from './components/layout/Navbar';
import ResumeBuilderPage from './pages/ResumeBuilderPage';
import CommunitiesPage from './pages/CommunitiesPage';


// Layout component to wrap pages that should have the navbar
const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  
  // Don't show navbar or chatbot on auth page
  if (location.pathname === '/') {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar onOpenChatbot={() => setIsChatbotOpen(true)} />
      <div className="min-h-screen bg-gray-50">
        {children}
        {/* Floating Chatbot Button */}
        <button
          className="fixed bottom-6 right-6 z-50 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg p-4 transition-colors flex items-center justify-center"
          onClick={() => setIsChatbotOpen(true)}
          aria-label="Open Chatbot"
        >
          <span className="text-2xl">🤖</span>
        </button>
        {/* Chatbot Modal */}
        <ChatbotModal isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/career-path" element={<CareerPathPage />} />
          <Route path="/career-path/:domainId/:subDomainId" element={<CareerPathDetailPage />} />
          <Route path="/resume-builder" element={<ResumeBuilderPage />} />
          <Route path="/communities" element={<CommunitiesPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;