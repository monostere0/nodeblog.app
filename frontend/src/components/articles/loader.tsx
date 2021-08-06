import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Classes } from '@blueprintjs/core';
import classnames from 'classnames';

const styles = StyleSheet.create({
  title: {
    width: '75vw',
  },
  subTitle: {
    width: '60vw',
    margin: '4vh 0 2vh 0',
  },
  line: {
    width: '75vw',
    height: '2vh',
  },
});

interface Props {
  skeletonsCount?: number;
}

const Loader: React.FC<Props> = ({ skeletonsCount = 1 }) => (
  <div>
    {Array.from({ length: skeletonsCount }).map((_, i) => (
      <article key={i}>
        <h1 className={classnames(css(styles.title), Classes.SKELETON)}>
          This content
        </h1>
        <h3 className={classnames(css(styles.subTitle), Classes.SKELETON)}>
          is loading...
        </h3>
        <p className={classnames(css(styles.line), Classes.SKELETON)}></p>
        <p className={classnames(css(styles.line), Classes.SKELETON)}></p>
        <p className={classnames(css(styles.line), Classes.SKELETON)}></p>
      </article>
    ))}
  </div>
);

export default Loader;
