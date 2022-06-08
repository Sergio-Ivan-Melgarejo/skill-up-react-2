import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import { store } from './store/store';
import './index.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <HashRouter basename='skill-up-react-2/'>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </StrictMode>
);