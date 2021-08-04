import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './app';

const AppRoot: React.FC = () => (
  <Router>
    <App />
  </Router>
);

export default AppRoot;
