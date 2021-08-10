import React from 'react';
import { StyleSheet, css } from 'aphrodite';

import react from '../assets/react.svg';
import blueprint from '../assets/blueprint.png';
import lambda from '../assets/lambda.svg';
import dynamo from '../assets/dynamodb.svg';
import s3 from '../assets/s3.svg';
import apigw from '../assets/apigw.svg';

const styles = StyleSheet.create({
  root: {
    width: '100vw',
    marginTop: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '.5rem',
    backgroundColor: process.env.REACT_APP_FOREGROUND_COLOR,
  },
  description: {
    color: process.env.REACT_APP_BACKGROUND_COLOR,
    fontSize: '.65rem',
    marginRight: '.2rem',
  },
  icon: {
    width: 25,
    height: 25,
    borderRadius: 8,
    margin: '0 0.15rem',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    padding: '1px',
  },
});

const footerIcons: { icon: string; label: string }[] = [
  {
    icon: react,
    label: 'React JS',
  },
  {
    icon: blueprint,
    label: 'Blueprint JS',
  },
  {
    icon: s3,
    label: 'Amazon S3',
  },
  {
    icon: lambda,
    label: 'Amazon Lambda',
  },
  {
    icon: dynamo,
    label: 'Amazon DynamoDB',
  },
  {
    icon: apigw,
    label: 'Amazon API Gateway',
  },
];

const Footer: React.FC = () => (
  <footer className={css(styles.root)}>
    <small className={css(styles.description)}>Powered by</small>
    {footerIcons.map(({ icon, label }, index) => (
      <img
        key={index}
        src={icon}
        className={css(styles.icon)}
        alt={label}
        title={label}
      />
    ))}
  </footer>
);

export default Footer;
