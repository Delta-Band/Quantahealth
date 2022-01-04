import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import cx from 'classnames';
import { Typography } from '@mui/material';

const useStyles = makeStyles(() => ({
  richTxt: {
    flexShrink: 0,
    fontSize: 16,
    lineHeight: '25px',
    '& .ql-size-huge': {
      fontSize: 24,
      lineHeight: '28px',
      fontWeight: 'bold'
    }
  }
}));

export default function Richtext({ html, className }) {
  const classes = useStyles();

  return (
    <Typography
      className={cx(classes.richTxt, className)}
      component='div'
      dangerouslySetInnerHTML={{
        __html: html
      }}
    ></Typography>
  );
}
