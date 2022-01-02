import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  dataWrapper: {}
}));

export default function Data() {
  const classes = useStyles();

  return <div className={classes.dataWrapper}>Data</div>;
}
