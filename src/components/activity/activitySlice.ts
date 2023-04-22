import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Activity } from "../../framework.types";
import store, { RootState } from "../../app/store";

const activitiesAdapter = createEntityAdapter<Activity>({
  selectId: (activity) => activity.id,
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

export const activitieSlice = createSlice({
  name: "activities",
  initialState: activitiesAdapter.getInitialState(),
  reducers: {
    insertActivity: activitiesAdapter.addOne,
    updateActivity: activitiesAdapter.upsertOne,
    removeActivity: activitiesAdapter.removeOne,
  },
});

export const { updateActivity, insertActivity, removeActivity } =
  activitieSlice.actions;

const activitieSelectors = activitiesAdapter.getSelectors<RootState>(
  (state) => state.activities
);

// Selectors
export const selectAllActivities = activitieSelectors.selectAll;
export const selectActivity = activitieSelectors.selectById;

export default activitieSlice.reducer;
