import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Plus as Icon } from '@styled-icons/feather/Plus';
import cx from 'classnames';

const useStyles = makeStyles(theme => ({
  frameIndicatorWrapper: {
    display: 'inline-flex'
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
    marginBottom: theme.spacing(1),
    '&:last-child': {
      marginBottom: 0
    }
  }
}));

export default function FrameIndicator({ frames, vertical }) {
  const classes = useStyles();

  return (
    <div
      className={cx(classes.frameIndicatorWrapper, {
        [classes.vertical]: vertical
      })}
    >
      {frames.map(frame => (
        <Icon
          key={frame.id}
          className={vertical ? classes.iconVertical : classes.icon}
          size={34}
        />
      ))}
    </div>
  );
}
