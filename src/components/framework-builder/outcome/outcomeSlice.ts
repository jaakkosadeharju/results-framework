import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Outcome } from "../../../results";
import store from "../../../app/store";

const outcomesAdapter = createEntityAdapter<Outcome>({
  selectId: (outcome) => outcome.id,
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

export const outcomeSlice = createSlice({
  name: "outcomes",
  initialState: outcomesAdapter.getInitialState(),
  reducers: {
    upsertOutcome: outcomesAdapter.upsertOne,
    removeOutcome: outcomesAdapter.removeOne,
  },
});

export const { upsertOutcome, removeOutcome } = outcomeSlice.actions;

type RootState = ReturnType<typeof store.getState>;
const outcomeSelectors = outcomesAdapter.getSelectors<RootState>(
  (state) => state.outcomes
);

// Selectors
export const selectAllOutcomes = outcomeSelectors.selectAll;
export const selectOutcome = outcomeSelectors.selectById;

export default outcomeSlice.reducer;
