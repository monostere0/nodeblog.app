import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';

import Header from './header';
import Footer from './footer';
import ArticlesList from './articles';
import Article from './articles/article';
import CreateArticle from './admin/createArticle';

import Toasts from './toasts';

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
        <Toasts />
        <Routes>
          <Route path="/" element={<ArticlesList />} />
          <Route path="/articles/:slug" element={<Article />} />
          <Route path="/admin/create-article" element={<CreateArticle />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
