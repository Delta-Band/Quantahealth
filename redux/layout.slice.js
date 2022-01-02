import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  brand: {},
  seo: {}
};

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    storeData: (state, action) => {
      state.brand = action.payload.brand;
      state.seo = action.payload.seo;
    }
  }
});

export const { storeData } = layoutSlice.actions;

export const selectBrand = state => state.layout.brand;
export const selectSeo = state => state.layout.seo;

export default layoutSlice.reducer;
