import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Goal } from "../../../results";
import store from "../../../app/store";

const goalsAdapter = createEntityAdapter<Goal>({
  selectId: (goal) => goal.id,
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

export const goalSlice = createSlice({
  name: "goal",
  initialState: goalsAdapter.getInitialState(),
  reducers: {
    upsertGoal: goalsAdapter.upsertOne,
    removeGoal: goalsAdapter.removeOne,
  },
});

export const { upsertGoal, removeGoal } = goalSlice.actions;

type RootState = ReturnType<typeof store.getState>;
const goalSelectors = goalsAdapter.getSelectors<RootState>(
  (state) => state.goals
);

// Selectors
export const selectAllGoals = goalSelectors.selectAll;
export const selectGoal = goalSelectors.selectById;

export default goalSlice.reducer;
