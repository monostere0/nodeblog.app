import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Header';

import ArticlesList from './ArticlesList';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact component={ArticlesList} />
        {/* <Route path="/dashboard/:id" component={DashboardScreen} /> */}
      </Switch>
    </div>
  );
};

export default App;
