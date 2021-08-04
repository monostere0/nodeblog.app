import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Spinner } from '@blueprintjs/core';

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50vh',
  },
});

const Loader: React.FC = () => (
  <div className={css(styles.root)}>
    <Spinner />
  </div>
);

export default Loader;
