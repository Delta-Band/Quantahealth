import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import cx from 'classnames';

const useStyles = makeStyles(theme => ({
  footerWrapper: {
    padding: '0 !important',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 'unset !important',
    height: 410,
    background: '#000',
    position: 'relative',
    borderTopRightRadius: 80,
    borderTopLeftRadius: 80,
    width: '100vw',
    border: '2px solid white',
    borderBottom: 'none',
    boxShadow: '0 -2px 13px rgba(0, 0, 0, 0.4)',
    zIndex: 1,
    maxHeight: 'calc(100% - 70px)'
  }
}));

export default function Footer({ className, data }) {
  const classes = useStyles();

  return (
    <footer
      className={cx(classes.footerWrapper, className)}
      style={{
        backgroundColor: data.bgColor || '#FFF'
      }}
    >
      <Typography
        style={{
          color: data.textMainColor || '#000'
        }}
      >
        Footer Section
      </Typography>
    </footer>
  );
}
