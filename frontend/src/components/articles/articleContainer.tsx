import React from 'react';
import { H1 } from '@blueprintjs/core';
import relativeDate from 'relative-date';
import { StyleSheet, css } from 'aphrodite';

export interface Article {
  id: string;
  authorName: string;
  title: string;
  content: string;
  date: string;
  slug: string;
}

interface Props {
  article: Article;
  children: React.ReactNode;
}

const styles = StyleSheet.create({
  root: {
    borderBottom: 'dashed 1px lightgray',
    padding: '2rem 0',
    display: 'flex',
    flexDirection: 'column',
    ':last-of-type': {
      border: 'none',
    },
  },
  title: {
    color: process.env.REACT_APP_FOREGROUND_COLOR,
  },
});

const ArticleContainer: React.FC<Props> = ({ article, children }) => (
  <article className={css(styles.root)}>
    <H1 className={css(styles.title)}>{article.title}</H1>
    <p>
      Written by <em>{article.authorName} </em>
      {relativeDate(new Date(article.date))}
    </p>
    {children}
  </article>
);

export default ArticleContainer;
