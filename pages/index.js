import React from 'react';
import reactor from '../reactor';
import { Helmet } from '../components';
import { Typography } from '@mui/material';

export async function getStaticProps(context) {
  reactor.init();
  const homeFrames = await reactor.getCollection('PcDI6UBZsHluOmA3R98o');
  const brand = await reactor.getDoc('ByUskJqD9mSicfW7DAfx');
  const seo = await reactor.getDoc('I4U9QMp4gGDtjeecssdZ');
  const footer = await reactor.getDoc('EZWgV5pcAXgJgDvM7O6q');
  const splash = await reactor.getDoc('BVqa4A7ZQCYYCYDUjyDG');
  const props = {
    frames: homeFrames || [],
    brand,
    seo,
    footer,
    splash
  };
  return {
    props,
    revalidate: 10
  };
}

export default function Home({ seo, brand, splash }) {
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
