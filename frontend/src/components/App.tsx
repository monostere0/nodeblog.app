import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';

import Header from './header';
import ArticlesList from './articles';
import Article from './articles/article';
import CreateArticle from './admin/createArticle';

const styles = StyleSheet.create({
  root: { padding: '0 5rem' },
});

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <main className={css(styles.root)}>
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
