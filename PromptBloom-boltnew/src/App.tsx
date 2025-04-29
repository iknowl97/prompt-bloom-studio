import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Import Pages
import HomePage from './pages/HomePage';
import PromptBuilder from './pages/PromptBuilder';
import Templates from './pages/Templates';
import Learn from './pages/Learn';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/prompt-builder" element={<PromptBuilder />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;