import React from 'react';
import { H1, Spinner } from '@blueprintjs/core';
import relativeDate from 'relative-date';
import api from '../../lib/api';
import { Link } from 'react-router-dom';

const ArticlesList: React.FC = () => {
  const [articles, setArticles] = React.useState([]);

  const getArticles = async () => {
    setArticles(await api.getArticles());
  };

  React.useEffect(() => {
    getArticles();
  }, []);

  if (articles.length === 0) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '50vh',
        }}
      >
        <Spinner />
      </div>
    );
  }

  return (
    <section>
      {articles.map((article: Record<any, any>) => (
        <article
          style={{
            borderBottom: 'dashed 1px lightgray',
            padding: '2rem 0',
            display: 'flex',
            flexDirection: 'column',
          }}
          key={article.id}
        >
          <H1 style={{ color: 'rebeccapurple' }}>{article.title}</H1>
          <p>
            Written by <em>{article.authorName} </em>
            {relativeDate(new Date(article.date))}
          </p>
          <Link style={{ marginTop: '1rem' }} to={`/articles/${article.slug}`}>
            Read article
          </Link>
        </article>
      ))}
    </section>
  );
};

export default ArticlesList;
