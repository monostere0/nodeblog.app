import * as React from 'react';
import { Link } from 'gatsby';
import { Button, Card, Classes, H5 } from '@blueprintjs/core';
import ReactMarkdown from 'react-markdown';
import classnames from 'classnames';

import Layout from '../components/layout';
import Seo from '../components/seo';
import api from '../api';

const ArticlesPage = () => {
  const [articles, setArticles] = React.useState([]);

  const getArticles = async () => {
    setArticles(await api.getArticles());
  };

  React.useEffect(() => {
    getArticles();
  }, []);

  return (
    <Layout>
      <Seo title="Page two" />
      <h1>Articles page</h1>
      <p>Welcome to page 2</p>
      <Link to="/">Go back to the homepage</Link>
      {articles.map(article => (
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
            <a href="#">{article.title}</a>
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
    </Layout>
  );
};

export default ArticlesPage;
