import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import cx from 'classnames';
import { Facebook as FacebookIcon } from '@styled-icons/boxicons-logos/Facebook';
import { Linkedin as LinkedinIcon } from '@styled-icons/boxicons-logos/Linkedin';
import { Twitter as TwitterIcon } from '@styled-icons/boxicons-logos/Twitter';

const useStyles = makeStyles(theme => ({
  socialWrapper: {
    display: 'inline-flex',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(2.5)
  },
  twitterAdjust: {
    '& svg': {
      transform: 'translate(1px, 0px)'
    }
  },
  linkedinAdjust: {
    '& svg': {
      transform: 'translate(0px, -2px)'
    }
  },
  facebookAdjust: {
    '& svg': {
      transform: 'translate(0px, -1px)'
    }
  },
  btn: {
    borderRadius: 3,
    height: 30,
    // background: 'red',
    marginTop: 0,
    background: 'rgba(255, 255, 255, 0.05)',
    marginInlineEnd: theme.spacing(1),
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.1)'
    }
  }
}));

export default function Social({ data }) {
  const classes = useStyles();

  return (
    <div className={classes.socialWrapper}>
      <Button
        size='small'
        className={cx(classes.btn, classes.facebookAdjust)}
        variant='outlined'
      >
        <FacebookIcon size={24} />
      </Button>
      <Button size='small' className={cx(classes.btn, classes.linkedinAdjust)}>
        <LinkedinIcon size={24} />
      </Button>
      <Button size='small' className={cx(classes.btn, classes.twitterAdjust)}>
        <TwitterIcon size={24} />
      </Button>
    </div>
  );
}
