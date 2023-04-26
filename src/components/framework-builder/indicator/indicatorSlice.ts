import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { Indicator } from "../../../framework.types";
import { RootState } from "../../../app/store";
import { selectAllIndicatorValues } from "./indicatorValueSlice";
import { resolveNextRecodingDateFromDueDate } from "../../../utils/resolveNextRecodingDateFromDueDate";
import dayjs from "dayjs";

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
    removeMultipleIndicators: indicatorsAdapter.removeMany,
  },
});

export const {
  insertIndicator,
  updateIndicator,
  removeIndicator,
  removeMultipleIndicators,
} = indicatorSlice.actions;

const indicatorselectors = indicatorsAdapter.getSelectors<RootState>(
  (state) => state.indicators
);

// Selectors
export const selectAllIndicators = indicatorselectors.selectAll;
export const selectIndicator = indicatorselectors.selectById;

// Resolve next filling dates for all indicators
export const selectIndicatorRecordingDates = createSelector(
  selectAllIndicators,
  selectAllIndicatorValues,
  (indicators, indicatorValues) => {
    const lastDates = indicators.map((indicator) => ({
      indicator,
      latestValue: indicatorValues
        .filter((iv) => iv.indicatorId === indicator.id)
        .sort((a, b) => (a.date < b.date ? 1 : -1))[0]?.date,
    }));

    return lastDates.map(({ indicator, latestValue }) => {
      const latestRecordingDate = dayjs(latestValue);
      let nextRecordingDate: dayjs.Dayjs | null = null;

      // Calculate from previous recording date unless dueDate is set
      if (
        !indicator.dueDate &&
        indicator.valueInterval &&
        indicator.valueIntervalType
      ) {
        nextRecordingDate = latestRecordingDate.add(
          indicator.valueInterval,
          indicator.valueIntervalType
        );
      }
      // Calculate from due date if set
      else if (
        indicator.dueDate &&
        indicator.valueInterval &&
        indicator.valueIntervalType
      ) {
        const dueDate = dayjs(indicator.dueDate);
        const interval = indicator.valueInterval;
        const intervalType = indicator.valueIntervalType;

        nextRecordingDate = resolveNextRecodingDateFromDueDate(
          dueDate,
          interval,
          intervalType
        );
      }

      return {
        indicator,
        latestValue,
        nextRecordingDate: nextRecordingDate?.format("L"),
      };
    });
  }
);

export default indicatorSlice.reducer;
