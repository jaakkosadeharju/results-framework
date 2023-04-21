import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Indicator } from "../../../results";
import store from "../../../app/store";

const indicatorsAdapter = createEntityAdapter<Indicator>({
  selectId: (indicator) => indicator.id,
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

export const indicatorslice = createSlice({
  name: "indicators",
  initialState: indicatorsAdapter.getInitialState(),
  reducers: {
    upsertIndicator: indicatorsAdapter.upsertOne,
    removeIndicator: indicatorsAdapter.removeOne,
  },
});

export const { upsertIndicator, removeIndicator } = indicatorslice.actions;

type RootState = ReturnType<typeof store.getState>;
const indicatorselectors = indicatorsAdapter.getSelectors<RootState>(
  (state) => state.indicators
);

// Selectors
export const selectAllIndicators = indicatorselectors.selectAll;
export const selectIndicator = indicatorselectors.selectById;

export default indicatorslice.reducer;
