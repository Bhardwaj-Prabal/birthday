import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Note from './pages/Note';
import Cake from './pages/Cake';
import Timeline from './pages/Timeline';
import Gift from './pages/Gift';
import ILoveYou from './pages/ILoveYou';
import Puzzle from './pages/Puzzle';
import Future from './pages/Future';
import ThankYou from './pages/ThankYou';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-romantic-light to-pink-100">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/note" element={<Note />} />
            <Route path="/cake" element={<Cake />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/gift" element={<Gift />} />
            <Route path="/iloveyou" element={<ILoveYou />} />
            <Route path="/puzzle" element={<Puzzle />} />
            <Route path="/future" element={<Future />} />
            <Route path="/thankyou" element={<ThankYou />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;