import React from 'react';
import { Breadcrumbs } from '@blueprintjs/core';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import breaks from 'remark-breaks';

import { useArticle } from '../../lib/hooks';
import Loader from './skeletonLoader';
import ArticleContainer from './articleContainer';
import { useParams } from 'react-router-dom';

const Article: React.FC<Record<string, string>> = () => {
  const params = useParams();
  const { data: article, loading, error } = useArticle(params.slug as string);

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
