import React from 'react';
import { Card, Classes, H5 } from '@blueprintjs/core';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import breaks from 'remark-breaks';
import classnames from 'classnames';

import api from '../../lib/api';
import { Link, RouteComponentProps } from 'react-router-dom';

const Article: React.FC<RouteComponentProps<Record<string, string>>> = ({
  match,
}) => {
  const [article, setArticle] = React.useState<Record<any, any>>();

  const getArticle = async () => {
    setArticle(
      (await api.getArticle(match.params.slug as string)) as unknown[]
    );
  };

  React.useEffect(() => {
    getArticle();
  }, []);

  if (article === undefined) {
    return null;
  }

  return (
    <div>
      <h1>Articles page</h1>
      <p>Welcome to page 2</p>
      <Card key={article.id} style={{ marginBottom: '1em' }}>
        <H5>{article.title}</H5>
        <div>
          <ReactMarkdown
            remarkPlugins={[gfm, breaks]}
            children={article.content}
          />
        </div>
      </Card>
    </div>
  );
};

export default Article;
