import React from 'react';

import 'normalize.css/normalize.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/core/lib/css/blueprint.css';

import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rebeccapurple',
    marginBottom: '1.45rem',
    color: 'white',
    height: 200,
  },
  headerContainer: {
    margin: '0 auto',
    maxWidth: 960,
    padding: '1.45rem 1.0875rem',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
  },
  title: { margin: 0 },
});

const Header: React.FC = () => (
  <header className={css(styles.header)}>
    <div className={css(styles.headerContainer)}>
      <h1 className={css(styles.title)}>
        <span>NodeBlog.</span>
      </h1>
    </div>
  </header>
);

export default Header;
