import { configureStore } from '@reduxjs/toolkit';

import layoutSlice from './layout.slice';

export function makeStore() {
  return configureStore({
    reducer: { layout: layoutSlice }
  });
}

const store = makeStore();

export default store;
