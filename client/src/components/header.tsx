import * as React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
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
});

const Header = ({ siteTitle }) => (
  <header className={css(styles.header)}>
    <div className={css(styles.headerContainer)}>
      <h1 className={css(styles.title)}>
        <Link to="/" className={css(styles.link)}>
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
