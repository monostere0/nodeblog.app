import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';

import Header from './header';
import Footer from './footer';
import ArticlesList from './articles';
import Article from './articles/article';
import CreateArticle from './admin/createArticle';

const styles = StyleSheet.create({
  root: {
    padding: '0 5rem',
    '@media screen and (max-device-width: 480px)': {
      padding: '0 1rem',
    },
    backgroundColor: process.env.REACT_APP_BACKGROUND_COLOR,
  },
});

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main className={css(styles.root)}>
        <Switch>
          <Route path="/" exact component={ArticlesList} />
          <Route path="/articles/:slug" component={Article} />
          <Route path="/admin/create-article" component={CreateArticle} />
        </Switch>
      </main>
      <Footer />
    </>
  );
};

export default App;
