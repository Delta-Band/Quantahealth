import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FrameIndicator } from '../components';

const useStyles = makeStyles(theme => ({
  mainWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    maxHeight: '-webkit-fill-available',
    overflow: 'hidden'
  },
  topBar: {
    height: 65,
    width: '100%',
    background: 'grey',
    flexShrink: 0,
    paddingInline: theme.spacing(2),
    paddingBlock: theme.spacing(1.5),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  contentWrapper: {
    background: 'red',
    height: '100%',
    width: '100%',
    height: '100%',
    overflow: 'auto'
  },
  img: {
    height: '100%'
  }
}));

export default function IpadLayout({ logo, frames }) {
  const classes = useStyles();

  return (
    <div className={classes.mainWrapper}>
      <div className={classes.topBar}>
        <img className={classes.img} src={logo} alt='Quathealth Logo' />
        <FrameIndicator frames={frames} />
      </div>
      <div className={classes.contentWrapper}>
        <div>Page Layout</div>
      </div>
    </div>
  );
}
