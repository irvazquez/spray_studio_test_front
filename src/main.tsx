// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Home } from './pages/Home.tsx';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme.tsx';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <Home />
  </ThemeProvider>
);
