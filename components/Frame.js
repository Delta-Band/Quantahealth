import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useVisible } from 'react-hooks-visible';
import { InView } from 'react-intersection-observer';

import cx from 'classnames';
import { Typography, Grid } from '@mui/material';

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
  index,
  scrollDirection,
  allFrames
}) {
  const classes = useStyles();
  const [targetRef, percent] = useVisible();
  const [ref, setRef] = React.useState();
  // const { isIntersecting } = useIntersectionObserver(ref, {
  //   root: document.getElementById('mainWrapper')
  // });

  // useEffect(() => {
  //   if (percent >= 0.5) {
  //     onVisible(frame);
  //   }
  // }, [percent]);

  // useEffect(() => {
  //   if (isIntersecting) {
  //     onVisible(frame);
  //   }
  // }, [isIntersecting]);

  return (
    <InView rootMargin='-120px 0px -120px 0px'>
      {({ inView, ref, entry }) => {
        inView ? console.log(`inView:`, frame.label) : null;
        // inView ? onVisible(frame) : null;
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
