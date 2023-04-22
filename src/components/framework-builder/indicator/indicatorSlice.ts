import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Indicator } from "../../../results";
import store, { RootState } from "../../../app/store";

const indicatorsAdapter = createEntityAdapter<Indicator>({
  selectId: (indicator) => indicator.id,
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

export const indicatorslice = createSlice({
  name: "indicators",
  initialState: indicatorsAdapter.getInitialState(),
  reducers: {
    insertIndicator: indicatorsAdapter.addOne,
    updateIndicator: indicatorsAdapter.upsertOne,
    removeIndicator: indicatorsAdapter.removeOne,
  },
});

export const { insertIndicator, updateIndicator, removeIndicator } =
  indicatorslice.actions;

const indicatorselectors = indicatorsAdapter.getSelectors<RootState>(
  (state) => state.indicators
);

// Selectors
export const selectAllIndicators = indicatorselectors.selectAll;
export const selectIndicator = indicatorselectors.selectById;

export default indicatorslice.reducer;
