import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  contactWrapper: {}
}));

export default function Contact() {
  const classes = useStyles();

  return <div className={classes.contactWrapper}>Contact</div>;
}
