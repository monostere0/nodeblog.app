import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Breadcrumbs } from '@blueprintjs/core';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import breaks from 'remark-breaks';

import { useArticle } from '../../lib/hooks';
import { Article as IArticle } from '../../lib/interfaces';
import Loader from './skeletonLoader';
import ArticleContainer from './articleContainer';

const Article: React.FC<RouteComponentProps<Record<string, string>>> = ({
  match,
}) => {
  const {
    data: article,
    loading,
    error,
  } = useArticle(match.params.slug as string);

  if (loading) {
    return <Loader />;
  }

  if (error || article === undefined) {
    return null;
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
