import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FrameIndicator } from '../components';

const useStyles = makeStyles(theme => ({
  sideBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    background: 'grey',
    paddingInline: theme.spacing(3),
    paddingBlock: theme.spacing(2),
    width: 200,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    [theme.breakpoints.up('desktop')]: {
      width: 300,
      paddingInline: theme.spacing(6)
    }
  },
  contentWrapper: {
    background: 'red',
    width: '70vw',
    margin: '0 auto',
    maxWidth: '100vw',
    transform: 'translateX(10%)',
    [theme.breakpoints.up('desktop')]: {
      width: '60vw',
      paddingInline: theme.spacing(6)
    },
    [theme.breakpoints.up('widescreen')]: {
      width: 1300,
      transform: 'unset',
      paddingInline: theme.spacing(6)
    }
  },
  img: {
    width: '100%'
  }
}));

export default function DesktopLayout({ logo, frames }) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.sideBar}>
        <img className={classes.img} src={logo} alt='Quathealth Logo' />
        <FrameIndicator frames={frames} vertical />
      </div>
      <div className={classes.contentWrapper}>Page Layout</div>
    </>
  );
}
