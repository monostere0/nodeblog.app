import React from 'react';
import { Card, Classes, H5 } from '@blueprintjs/core';
import ReactMarkdown from 'react-markdown';
import classnames from 'classnames';

import api from '../lib/api';
import { Link } from 'react-router-dom';

const ArticlesList: React.FC = () => {
  const [articles, setArticles] = React.useState([]);

  const getArticles = async () => {
    setArticles(await api.getArticles());
  };

  React.useEffect(() => {
    getArticles();
  }, []);

  return (
    <div>
      <h1>Articles page</h1>
      <p>Welcome to page 2</p>
      {articles.map((article: Record<any, any>) => (
        <Card
          key={article.id}
          style={{ marginBottom: '1em' }}
          className={classnames({
            [Classes.SKELETON]: articles.length === 0,
          })}
        >
          <H5
            className={classnames({
              [Classes.SKELETON]: articles.length === 0,
            })}
          >
            {article.title}
          </H5>
          <p
            className={classnames({
              [Classes.SKELETON]: articles.length === 0,
            })}
          >
            <ReactMarkdown children={article.description} />
          </p>
          <Link to={`/articles/${article.slug}`}>View article</Link>
        </Card>
      ))}
    </div>
  );
};

export default ArticlesList;
