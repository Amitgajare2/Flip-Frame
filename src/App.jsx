import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Code from './pages/Code';
import Preview from './pages/Preview';
import HomePage from './pages/HomePage';
import { AnimatePresence } from 'framer-motion'

function App() {
  return (
    <AnimatePresence mode="wait">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/code" element={<Code />} />
          <Route path="/:codeId" element={<Preview />} />
        </Routes>
      </Router>
    </AnimatePresence>
  );
}

export default App;
