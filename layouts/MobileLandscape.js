import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FrameIndicator } from '../components';

const useStyles = makeStyles(theme => ({
  mainWrapper: {
    display: 'flex',
    height: '100vh',
    maxHeight: '-webkit-fill-available',
    overflow: 'hidden'
  },
  sideBar: {
    height: '100%',
    width: 65,
    background: 'grey',
    flexShrink: 0,
    paddingBlock: theme.spacing(1.5),
    paddingInline: theme.spacing(1.5),
    display: 'flex',
    flexDirection: 'column',
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
    width: '100%'
  }
}));

export default function MobileLandscape({ logo, frames }) {
  const classes = useStyles();

  return (
    <div className={classes.mainWrapper}>
      <div className={classes.sideBar}>
        <img className={classes.img} src={logo} alt='Quathealth Logo' />
        <FrameIndicator frames={frames} vertical />
      </div>
      <div className={classes.contentWrapper}>
        <div>Page Layout</div>
      </div>
    </div>
  );
}
