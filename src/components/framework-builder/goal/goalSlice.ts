import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Goal } from "../../../framework.types";
import { RootState } from "../../../app/store";

const goalsAdapter = createEntityAdapter<Goal>({
  selectId: (goal) => goal.id,
  sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
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
