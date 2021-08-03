import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';

const AppRoot: React.FunctionComponent = () => (
  <Router>
    <App />
  </Router>
);

export default AppRoot;
