import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Header';

import ArticlesList from './articles';
import Article from './articles/article';
import CreateArticle from './admin/create-article';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <main style={{ margin: '0 5rem' }}>
        <Switch>
          <Route path="/" exact component={ArticlesList} />
          <Route path="/articles/:slug" component={Article} />
          <Route path="/admin/create-article" component={CreateArticle} />
        </Switch>
      </main>
    </div>
  );
};

export default App;
