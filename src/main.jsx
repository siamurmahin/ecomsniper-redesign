import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/index.css';

/*
 * `js-motion` is what arms the reveal animations. Because it is added by
 * script, a visitor without JS never gets the CSS that hides `[data-reveal]`
 * elements, so the page stays fully readable either way.
 */
document.documentElement.classList.add('js-motion');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
