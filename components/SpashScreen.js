import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  spashscreenWrapper: {}
}));

export default function Spashscreen() {
  const classes = useStyles();

  return <div className={classes.spashscreenWrapper}>Spashscreen</div>;
}
