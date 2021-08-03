import React from 'react';
import { H1 } from '@blueprintjs/core';
import ReactMarkdown from 'react-markdown';
import relativeDate from 'relative-date';
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
      <H1 style={{ color: 'rebeccapurple' }}>{article.title}</H1>
      <p>
        Written by <em>{article.authorName} </em>
        {relativeDate(new Date(article.date))}
      </p>
      <div style={{ borderBottom: 'dashed 1px lightgray', padding: '2rem 0' }}>
        <ReactMarkdown
          remarkPlugins={[gfm, breaks]}
          children={article.content}
        />
      </div>
    </div>
  );
};

export default Article;
