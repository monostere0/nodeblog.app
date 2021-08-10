import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Link } from 'react-router-dom';

import 'normalize.css/normalize.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/core/lib/css/blueprint.css';

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    alignItems: 'center',
    background: 'rebeccapurple',
    marginBottom: '1.45rem',
    color: 'floralwhite',
    height: '200px',
    flex: 'none',
  },
  headerContainer: {
    maxWidth: 960,
    paddingLeft: '5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    '@media screen and (max-device-width: 480px)': {
      paddingLeft: '1rem',
    },
  },
  link: {
    color: 'floralwhite',
  },
  title: { margin: 0, fontSize: '3rem' },
});

const Header: React.FC = () => (
  <header className={css(styles.header)}>
    <div className={css(styles.headerContainer)}>
      <h1 className={css(styles.title)}>
        <Link className={css(styles.link)} to="/">
          <span>NodeBlog.</span>
        </Link>
      </h1>
      <span>
        Blogging that <em>really</em> matters.
      </span>
    </div>
  </header>
);

export default Header;
