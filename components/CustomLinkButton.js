import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  customlinkbuttonWrapper: {}
}));

export default function CustomLinkButton({ frame }) {
  const classes = useStyles();
  if (frame.customLink && frame.customLinkLable) {
    return (
      <Button
        className={classes.customlinkbuttonWrapper}
        href={frame.customLink}
        variant='contained'
        fullWidth
        target={
          frame.openWhere.toLowerCase() === 'new tab' ? '_blank' : undefined
        }
      >
        {frame.customLinkLable}
      </Button>
    );
  } else {
    return null;
  }
}
