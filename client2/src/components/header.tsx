import * as React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { StyleSheet, css } from 'aphrodite';

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: `rebeccapurple`,
    marginBottom: `1.45rem`,
    height: 200,
  },
  headerContainer: {
    margin: `0 auto`,
    maxWidth: 960,
    padding: `1.45rem 1.0875rem`,
  },
  link: {
    color: `white`,
    textDecoration: `none`,
  },
  title: { margin: 0 },
};

const Header = ({ siteTitle }) => (
  <header style={styles.header}>
    <div style={styles.headerContainer}>
      <h1 style={styles.title}>
        <Link to="/" style={styles.link}>
          {siteTitle}
        </Link>
      </h1>
    </div>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
