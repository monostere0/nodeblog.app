import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Breadcrumbs } from '@blueprintjs/core';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import breaks from 'remark-breaks';

import api from '../../lib/api';
import Loader from './loader';
import ArticleContainer, { Article as IArticle } from './articleContainer';

const Article: React.FC<RouteComponentProps<Record<string, string>>> = ({
  match,
}) => {
  const [article, setArticle] = React.useState<IArticle>();

  const getArticle = async () => {
    setArticle((await api.getArticle(match.params.slug as string)) as IArticle);
  };

  React.useEffect(() => {
    getArticle();
  }, []);

  if (article === undefined) {
    return <Loader />;
  }

  return (
    <section>
      <Breadcrumbs
        items={[
          { href: '/', icon: 'home' },
          {
            href: `/articles/${article.slug}`,
            icon: 'manually-entered-data',
            text: article.title,
          },
        ]}
      />
      <ArticleContainer article={article}>
        <div>
          <ReactMarkdown
            remarkPlugins={[gfm, breaks]}
            children={article.content}
          />
        </div>
      </ArticleContainer>
    </section>
  );
};

export default Article;
