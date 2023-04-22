import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Goal } from "../../../results";
import store, { RootState } from "../../../app/store";

const goalsAdapter = createEntityAdapter<Goal>({
  selectId: (goal) => goal.id,
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

export const goalSlice = createSlice({
  name: "goal",
  initialState: goalsAdapter.getInitialState(),
  reducers: {
    insertGoal: goalsAdapter.addOne,
    updateGoal: goalsAdapter.upsertOne,
    removeGoal: goalsAdapter.removeOne,
  },
});

export const { insertGoal, updateGoal, removeGoal } = goalSlice.actions;

const goalSelectors = goalsAdapter.getSelectors<RootState>(
  (state) => state.goals
);

// Selectors
export const selectAllGoals = goalSelectors.selectAll;
export const selectGoal = goalSelectors.selectById;

export default goalSlice.reducer;
