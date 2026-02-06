import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Learn from './pages/Learn';
import Quiz from './pages/Quiz';
import LevelSelect from './pages/LevelSelect';
import Shop from './pages/Shop';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="learn" element={<Learn />} />
        <Route path="level-select" element={<LevelSelect />} />
        <Route path="shop" element={<Shop />} />
        <Route path="quiz" element={<Quiz />} />
      </Route>
    </Routes>
  );
}

export default App;
