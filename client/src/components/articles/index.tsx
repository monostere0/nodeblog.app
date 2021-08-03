import React from 'react';
import { Card, H5 } from '@blueprintjs/core';

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

  return (
    <div>
      <h1>Articles page</h1>
      <p>Welcome to page 2</p>
      {articles.map((article: Record<any, any>) => (
        <Card key={article.id} style={{ marginBottom: '1em' }}>
          <H5>{article.title}</H5>
          <Link to={`/articles/${article.slug}`}>View article</Link>
        </Card>
      ))}
    </div>
  );
};

export default ArticlesList;
