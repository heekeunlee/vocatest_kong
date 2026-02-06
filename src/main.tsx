import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { GameProvider } from './context/GameContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameProvider>
      <BrowserRouter basename="/vocatest_kong">
        <App />
      </BrowserRouter>
    </GameProvider>
  </StrictMode>
);
