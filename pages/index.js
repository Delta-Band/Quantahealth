import React from 'react';
import * as reactor from '../reactor';
import { Helmet } from '../components';
import { Typography } from '@mui/material';

export async function getStaticProps(context) {
  reactor.init();
  const homeFrames = await reactor.getModular('PcDI6UBZsHluOmA3R98o');
  const brand = await reactor.getFixed('ByUskJqD9mSicfW7DAfx');
  const seo = await reactor.getFixed('I4U9QMp4gGDtjeecssdZ');
  return {
    props: {
      frames: homeFrames,
      brand,
      seo,
      revalidate: 10
    }
  };
}

export default function Home({ brand, seo }) {
  // console.log(frames);
  // console.log(seo);
  return (
    <>
      <Helmet
        title={seo.metaTitleHome}
        description={seo.metaDescriptionHome}
        imageForSocial={brand.imageForSocial}
        favicon={brand.favicon}
      />
    </>
  );
}
