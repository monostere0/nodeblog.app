import * as React from 'react';
import { Link } from 'gatsby';
import { Button, Card, Classes, H5 } from '@blueprintjs/core';
// import ReactMarkdown from 'react-markdown';
import classnames from 'classnames';

import Layout from '../components/layout';
import Seo from '../components/seo';
import api from '../api';

const ArticlePage = ({ pageContext: { slug } }) => {
  const [article, setArticle] = React.useState<unknown[]>([]);

  const getArticles = async () => {
    setArticle((await api.getArticle(slug as string)) as unknown[]);
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
      <Card
        key={article.id}
        style={{ marginBottom: '1em' }}
        className={classnames({
          [Classes.SKELETON]: article === null,
        })}
      >
        <H5
          className={classnames({
            [Classes.SKELETON]: article === null,
          })}
        >
          <a href="#">{article.title}</a>
        </H5>
        <div
          className={classnames({
            [Classes.SKELETON]: article === null,
          })}
        >
          {/* <ReactMarkdown children={article.content} /> */}
        </div>
      </Card>
    </Layout>
  );
};

export default ArticlePage;
