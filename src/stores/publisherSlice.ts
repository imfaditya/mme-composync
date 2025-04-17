import { picAffiliationDefaultValue } from '@/schemas/picAffiliationSchema';
import { publisherInfoDefaultValues } from '@/schemas/publisherInfoSchema';
import { PublisherState } from '@/types/publisherState';
import { createSlice } from '@reduxjs/toolkit';

const initialState: PublisherState = {
  publisherInfo: publisherInfoDefaultValues,
  picAffiliations: picAffiliationDefaultValue,
  validPicAffiliations: false,
  validPublisherInfo: false,
};

export const publisherSlice = createSlice({
  name: 'publisher',
  initialState,
  reducers: {
    setPublisherInfo: (state, action) => {
      state.publisherInfo = action.payload;
      state.validPublisherInfo = true;
    },
    setPicAffiliations: (state, action) => {
      state.picAffiliations = action.payload;
      state.validPicAffiliations = true;
    },
  },
});

export const { setPublisherInfo, setPicAffiliations } = publisherSlice.actions;
export default publisherSlice.reducer;
