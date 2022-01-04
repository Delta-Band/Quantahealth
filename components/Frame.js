import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useVisible } from 'react-hooks-visible';
import cx from 'classnames';
import { Typography, Grid } from '@mui/material';

const useStyles = makeStyles(theme => ({
  frameWrapper: {
    paddingBlock: theme.spacing(5),
    paddingInline: theme.spacing(3),
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    '& *': {
      fontFamily: 'GT America'
    }
  }
}));

export default function Frame({
  frame,
  onVisible,
  index,
  children,
  className
}) {
  const classes = useStyles();
  const [targetRef, percent] = useVisible();

  useEffect(() => {
    if (percent >= 0.5) {
      //   console.log(`frame ${index} is visible`);
      onVisible(frame);
    }
  }, [percent, frame, onVisible, index]);

  return (
    <div className={cx(className, classes.frameWrapper)} ref={targetRef}>
      {children}
    </div>
  );
}