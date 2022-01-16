import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { InView } from 'react-intersection-observer';
import cx from 'classnames';

const useStyles = makeStyles(theme => ({
  frameWrapper: {
    paddingBlock: theme.spacing(5),
    paddingInline: theme.spacing(3),
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    '& *': {
      fontFamily: 'GT America'
    }
  }
}));

export default function Frame({
  frame,
  onVisible,
  children,
  className,
  style,
  index
}) {
  const classes = useStyles();

  return (
    <InView rootMargin='-120px 0px -120px 0px'>
      {({ inView, ref, entry }) => {
        inView ? console.log(`inView:`, frame.label) : null;
        if (inView) {
          onVisible(index);
        }
        return (
          <div
            className={cx(className, classes.frameWrapper)}
            ref={ref}
            style={style}
          >
            {children}
          </div>
        );
      }}
    </InView>
  );
}
