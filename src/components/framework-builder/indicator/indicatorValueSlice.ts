import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { IndicatorValue } from "../../../framework.types";
import { RootState } from "../../../app/store";
import { selectIndicator } from "./indicatorSlice";

const indicatorValuesAdapter = createEntityAdapter<IndicatorValue>({
  selectId: (indicator) => indicator.id,
  sortComparer: (a, b) => a.date.localeCompare(b.date),
});

export const indicatorValueSlice = createSlice({
  name: "indicatorValues",
  initialState: indicatorValuesAdapter.getInitialState(),
  reducers: {
    insertIndicatorValue: indicatorValuesAdapter.addOne,
    updateIndicatorValue: indicatorValuesAdapter.upsertOne,
    removeIndicatorValue: indicatorValuesAdapter.removeOne,
  },
});

export const {
  insertIndicatorValue,
  updateIndicatorValue,
  removeIndicatorValue,
} = indicatorValueSlice.actions;

const indicatorValueSelectors = indicatorValuesAdapter.getSelectors<RootState>(
  (state) => state.indicatorValues
);

// Selectors
export const selectAllIndicatorValues = indicatorValueSelectors.selectAll;
export const selectIndicatorValue = indicatorValueSelectors.selectById;

const selectIndicatorId = (state: RootState, indicatorId: string) =>
  indicatorId;
export const selectIndicatorValuesByIndicatorId = createSelector(
  [selectAllIndicatorValues, selectIndicatorId],
  (indicatorValues, indicatorId: string) =>
    indicatorValues.filter(
      (indicatorValue) => indicatorValue.indicatorId === indicatorId
    )
);

export const selectCurrentValue = createSelector(
  [selectIndicatorValuesByIndicatorId],
  (indicatorValues) =>
    indicatorValues.sort((a, b) => (a.date < b.date ? 1 : -1))[0]
);

export default indicatorValueSlice.reducer;
