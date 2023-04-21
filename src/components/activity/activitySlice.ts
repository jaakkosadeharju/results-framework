import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Activity } from "../../results";
import store from "../../app/store";

const activitiesAdapter = createEntityAdapter<Activity>({
  selectId: (activity) => activity.id,
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

export const activitieSlice = createSlice({
  name: "activities",
  initialState: activitiesAdapter.getInitialState(),
  reducers: {
    upsertActivity: activitiesAdapter.upsertOne,
    removeActivity: activitiesAdapter.removeOne,
  },
});

export const { upsertActivity, removeActivity } = activitieSlice.actions;

type RootState = ReturnType<typeof store.getState>;
const activitieSelectors = activitiesAdapter.getSelectors<RootState>(
  (state) => state.activities
);

// Selectors
export const selectAllActivities = activitieSelectors.selectAll;
export const selectActivity = activitieSelectors.selectById;

export default activitieSlice.reducer;
