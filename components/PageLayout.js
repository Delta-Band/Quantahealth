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

export default function PageLayout({ logo, logoMobile, children }) {
  const ipad = useMediaQuery(theme => theme.breakpoints.up('ipad'));
  const laptop = useMediaQuery(theme => theme.breakpoints.up('laptop'));
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
      case laptop:
        return (
          <DesktopLayout
            logo={brand.logoDesktop}
            frames={children.props.frames}
          >
            {children}
          </DesktopLayout>
        );
      case ipad:
        return (
          <IpadLayout logo={brand.logoDesktop} frames={children.props.frames}>
            {children}
          </IpadLayout>
        );
      default:
        // defaults to smartphones
        return portrait ? (
          <MobileLayout logo={brand.logoMobile} frames={children.props.frames}>
            {children}
          </MobileLayout>
        ) : (
          <MobileLandscapeLayout
            logo={brand.logoMobile}
            frames={children.props.frames}
          >
            {children}
          </MobileLandscapeLayout>
        );
    }
  }

  return <div>{getResponsiveLayout()}</div>;
}
