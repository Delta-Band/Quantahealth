import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  sideBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    background: 'grey',
    width: 400,
    paddingInline: theme.spacing(6)
  },
  contentWrapper: {
    background: 'red',
    width: 1067,
    margin: '0 auto',
    maxWidth: '100vw'
  },
  img: {
    width: '100%'
  }
}));

export default function DesktopLayout({ logo }) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.sideBar}>
        <img className={classes.img} src={logo} alt='Quathealth Logo' />
      </div>
      <div className={classes.contentWrapper}>Page Layout</div>
    </>
  );
}
