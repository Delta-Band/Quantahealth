import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Plus as Icon } from '@styled-icons/feather/Plus';
import { AnimateSharedLayout, motion } from 'framer-motion';
import cx from 'classnames';

const useStyles = makeStyles(theme => ({
  frameIndicatorWrapper: {
    display: 'flex',
    height: '40vh',
    justifyContent: 'space-around'
    // height: '100%'
    // marginInline: theme.spacing(2),
    // paddingBlock: theme.spacing(0.5)
  },
  icon: {
    marginRight: theme.spacing(1),
    '&:last-child': {
      marginRight: 0
    }
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
    width: '100%',
    height: '100%',
    borderLeft: '1px solid black',
    borderRight: '1px solid black'
  },
  frameIconWrapper: {
    position: 'relative'
  }
}));

export default function FrameIndicator({ frames, vertical, visibleFrame }) {
  const classes = useStyles();

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
              size={34}
            />
            {visibleFrame.id === frame.id && (
              <motion.div className={classes.accent} layoutId='selected' />
            )}
          </div>
        ))}
      </div>
    </AnimateSharedLayout>
  );
}
