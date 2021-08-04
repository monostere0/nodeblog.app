import React from 'react';
import { Link } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';

import api from '../../lib/api';
import Loader from './loader';
import ArticleContainer, { Article } from './articleContainer';

const styles = StyleSheet.create({
  link: {
    marginTop: '1rem',
  },
});

const ArticlesList: React.FC = () => {
  const [articles, setArticles] = React.useState<Article[]>([]);

  const getArticles = async () => {
    setArticles((await api.getArticles()) as Article[]);
  };

  React.useEffect(() => {
    getArticles();
  }, []);

  if (articles.length === 0) {
    return <Loader />;
  }

  return (
    <section>
      {articles.map((article: Article) => (
        <ArticleContainer article={article}>
          <Link className={css(styles.link)} to={`/articles/${article.slug}`}>
            Read article
          </Link>
        </ArticleContainer>
      ))}
    </section>
  );
};

export default ArticlesList;
