import * as React from 'react';
import { Link } from 'gatsby';
import { Button, Card, Classes, H5 } from '@blueprintjs/core';

import Layout from '../components/layout';
import Seo from '../components/seo';

const ArticlesPage = () => {
  const [articles, setArticles] = React.useState([]);

  React.useEffect(() => {
    fetch(
      'https://xsbnh3bks5.execute-api.eu-central-1.amazonaws.com/prod/articles'
    )
      .then(response => response.json())
      .then(json => {
        setArticles(JSON.parse(json.body));
      });
  }, []);

  return (
    <Layout>
      <Seo title="Page two" />
      <h1>Articles page</h1>
      <p>Welcome to page 2</p>
      <Link to="/">Go back to the homepage</Link>
      {articles.map(article => (
        <Card key={article.id}>
          <H5>
            <a href="#">{article.title}</a>
          </H5>
          <p>{article.description}</p>
          <Button
            style={{ alignSelf: 'left' }}
            text="View full article"
            className={Classes.BUTTON}
          />
        </Card>
      ))}
    </Layout>
  );
};

export default ArticlesPage;
