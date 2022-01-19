import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  customlinkbuttonWrapper: {
    borderRadius: 0,
    borderInline: '1px solid',
    color: theme.palette.link.primary
  },
  bracketEdge: {
    position: 'absolute',
    width: theme.spacing(1),
    '&:nth-child(1)': {
      left: -8,
      top: -7,
      borderTop: '1px solid'
    },
    '&:nth-child(2)': {
      right: -8,
      top: -7,
      borderTop: '1px solid'
    },
    '&:nth-child(3)': {
      right: -8,
      bottom: -5,
      borderBottom: '1px solid'
    },
    '&:nth-child(4)': {
      left: -8,
      bottom: -5,
      borderBottom: '1px solid'
    }
  }
}));

export default function CustomLinkButton({ frame }) {
  const classes = useStyles();
  if (frame.customLink && frame.customLinkLable) {
    return (
      <Button
        className={classes.customlinkbuttonWrapper}
        href={frame.customLink}
        color='secondary'
        fullWidth
        target={
          frame.openWhere.toLowerCase() === 'new tab' ? '_blank' : undefined
        }
      >
        <div className={classes.bracketEdge} />
        <div className={classes.bracketEdge} />
        <div className={classes.bracketEdge} />
        <div className={classes.bracketEdge} />
        {frame.customLinkLable}
      </Button>
    );
  } else {
    return null;
  }
}
