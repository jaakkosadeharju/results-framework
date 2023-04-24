import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Indicator } from "../../../framework.types";
import { RootState } from "../../../app/store";

const indicatorsAdapter = createEntityAdapter<Indicator>({
  selectId: (indicator) => indicator.id,
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

export const indicatorSlice = createSlice({
  name: "indicators",
  initialState: indicatorsAdapter.getInitialState(),
  reducers: {
    insertIndicator: indicatorsAdapter.addOne,
    updateIndicator: indicatorsAdapter.upsertOne,
    removeIndicator: indicatorsAdapter.removeOne,
  },
});

export const { insertIndicator, updateIndicator, removeIndicator } =
  indicatorSlice.actions;

const indicatorselectors = indicatorsAdapter.getSelectors<RootState>(
  (state) => state.indicators
);

// Selectors
export const selectAllIndicators = indicatorselectors.selectAll;
export const selectIndicator = indicatorselectors.selectById;

export default indicatorSlice.reducer;
