import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import Tests from './pages/Tests.jsx';
import About from './pages/About.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Quiz from './components/Quiz.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tests" element={<Tests />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/quiz/:id" element={<Quiz />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        <footer className="footer">
          <div className="container">
            <p className="footer-text">
              © 2026 QuizMaster. Все права защищены.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

