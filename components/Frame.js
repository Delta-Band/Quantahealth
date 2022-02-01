import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { InView } from 'react-intersection-observer';
import cx from 'classnames';

const useStyles = makeStyles(theme => ({
  frameWrapper: {
    paddingBlock: theme.spacing(7),
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
  index,
  rootMargin = '-120px 0px -120px 0px',
  onOverlap = () => {}
}) {
  const classes = useStyles();
  // console.log(frame.id);

  return (
    <InView rootMargin={rootMargin}>
      {({ inView, ref, entry }) => {
        // if (frame.id === 'tLCoeNzikRlLRe9Nk04g') console.log(entry);
        // if (entry && entry.intersectionRatio > 0.02) {
        //   onOverlap(true);
        // } else {
        //   onOverlap(false);
        // }
        if (inView) {
          // inView ? console.log(`inView:`, frame.label) : null;
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
