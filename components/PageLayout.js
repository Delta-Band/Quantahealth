import React, { useEffect, useState } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useWindowOrientation from 'use-window-orientation';
import * as reactor from '../reactor';
import {
  DesktopLayout,
  MobileLayout,
  MobileLandscapeLayout,
  IpadLayout
} from '../layouts';

export default function PageLayout({ children }) {
  const { frames, footer } = children.props;
  const ipad = useMediaQuery(theme => theme.breakpoints.up('ipad'));
  const laptop = useMediaQuery(theme => theme.breakpoints.up('laptop'));
  const desktop = useMediaQuery(theme => theme.breakpoints.up('desktop'));
  const { portrait } = useWindowOrientation();
  const [brand, setBrand] = useState({});

  useEffect(() => {
    reactor.init();
    (async function getBarndData() {
      const brand = await reactor.getFixed('ByUskJqD9mSicfW7DAfx');
      setBrand(brand);
    })();
  }, []);

  function getResponsiveLayout() {
    switch (true) {
      case desktop:
        return (
          <DesktopLayout
            logo={brand.logoDesktop}
            frames={frames}
            footer={footer}
          >
            {children}
          </DesktopLayout>
        );
      case laptop:
        return (
          <MobileLandscapeLayout
            logo={brand.logoMobile}
            frames={frames}
            footer={footer}
          >
            {children}
          </MobileLandscapeLayout>
        );
      case ipad:
        return (
          <IpadLayout logo={brand.logoDesktop} frames={frames} footer={footer}>
            {children}
          </IpadLayout>
        );
      default:
        // defaults to smartphones
        return portrait ? (
          <MobileLayout logo={brand.logoMobile} frames={frames} footer={footer}>
            {children}
          </MobileLayout>
        ) : (
          <MobileLandscapeLayout
            logo={brand.logoMobile}
            frames={frames}
            footer={footer}
          >
            {children}
          </MobileLandscapeLayout>
        );
    }
  }

  return frames ? <div>{getResponsiveLayout()}</div> : null;
}
