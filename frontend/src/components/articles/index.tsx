import React from 'react';
import { Link } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';

import Loader from './skeletonLoader';
import ArticleContainer from './articleContainer';

import { useArticles } from '../../lib/hooks';
import { Article } from '../../lib/interfaces';

const styles = StyleSheet.create({
  root: {},
  link: {
    marginTop: '1rem',
  },
});

const ArticlesList: React.FC = () => {
  const { data: articles, error, loading } = useArticles();

  if (loading) {
    return <Loader sectionsCount={2} />;
  }

  if (error) {
    return null;
  }

  return (
    <section className={css(styles.root)}>
      {articles.map((article: Article) => (
        <ArticleContainer key={article.id} article={article}>
          <Link className={css(styles.link)} to={`/articles/${article.slug}`}>
            Read article
          </Link>
        </ArticleContainer>
      ))}
    </section>
  );
};

export default ArticlesList;
