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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
  },
  title: { margin: 0, fontSize: '3rem' },
});

const Header: React.FC = () => (
  <header className={css(styles.header)}>
    <div className={css(styles.headerContainer)}>
      <h1 className={css(styles.title)}>
        <span>NodeBlog.</span>
      </h1>
      <span>
        Blogging that <em>really</em> matters.
      </span>
    </div>
  </header>
);

export default Header;
