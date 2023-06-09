import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Outcome } from "../../../framework.types";
import { RootState } from "../../../app/store";

const outcomesAdapter = createEntityAdapter<Outcome>({
  selectId: (outcome) => outcome.id,
  sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
});

export const outcomeSlice = createSlice({
  name: "outcomes",
  initialState: outcomesAdapter.getInitialState(),
  reducers: {
    insertOutcome: outcomesAdapter.addOne,
    updateOutcome: outcomesAdapter.upsertOne,
    removeOutcome: outcomesAdapter.removeOne,
    removeMultipleOutcomes: outcomesAdapter.removeMany,
  },
});

export const {
  updateOutcome,
  insertOutcome,
  removeOutcome,
  removeMultipleOutcomes,
} = outcomeSlice.actions;

const outcomeSelectors = outcomesAdapter.getSelectors<RootState>(
  (state) => state.outcomes
);

// Selectors
export const selectAllOutcomes = outcomeSelectors.selectAll;
export const selectOutcome = outcomeSelectors.selectById;

export default outcomeSlice.reducer;
