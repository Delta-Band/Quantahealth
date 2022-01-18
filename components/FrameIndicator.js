import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Plus as Icon } from '@styled-icons/feather/Plus';
import { AnimateSharedLayout, motion } from 'framer-motion';
import cx from 'classnames';

const useStyles = makeStyles(theme => ({
  frameIndicatorWrapper: {
    display: 'inline-flex',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      justifyContent: 'space-around',
      height: '40vh',
      width: 300,
      paddingInline: theme.spacing(6)
    }
  },
  icon: {
    width: theme.spacing(4),
    height: theme.spacing(3)
  },
  vertical: {
    flexDirection: 'column',
    alignItems: 'center',
    // marginInline: theme.spacing(0.5),
    paddingBlock: theme.spacing(2)
  },
  iconVertical: {
    // marginBottom: theme.spacing(1),
    // '&:last-child': {
    //   marginBottom: 0
    // }
  },
  accent: {
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    // marginLeft: -9,
    width: '100%',
    height: '100%',
    marginTop: 1,
    [theme.breakpoints.up('sm')]: {
      marginTop: 0,
      borderLeft: '1px solid black',
      borderRight: '1px solid black'
    }
  },
  iconAccent: {
    color: theme.palette.primary.main
  },
  frameIconWrapper: {
    position: 'relative'
  }
}));

export default function FrameIndicator({ frames, vertical, visibleFrame }) {
  const classes = useStyles();
  const theme = useTheme();
  const downSm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AnimateSharedLayout>
      <div
        className={cx(classes.frameIndicatorWrapper, {
          [classes.vertical]: vertical
        })}
      >
        {frames.map(frame => (
          <div key={frame.id} className={classes.frameIconWrapper}>
            <Icon
              className={vertical ? classes.iconVertical : classes.icon}
              size={vertical ? (downSm ? 24 : 34) : 24}
            />
            {visibleFrame.id === frame.id && vertical && (
              <motion.div className={classes.accent} layoutId='selected' />
            )}
            {visibleFrame.id === frame.id && !vertical && (
              <motion.div className={classes.accent} layoutId='selected'>
                <Icon className={classes.iconAccent} size={18} />
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </AnimateSharedLayout>
  );
}
