import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Output } from "../../../results";
import store from "../../../app/store";

const outputsAdapter = createEntityAdapter<Output>({
  selectId: (output) => output.id,
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

export const outputSlice = createSlice({
  name: "outputs",
  initialState: outputsAdapter.getInitialState(),
  reducers: {
    upsertOutput: outputsAdapter.upsertOne,
    removeOutput: outputsAdapter.removeOne,
  },
});

export const { upsertOutput, removeOutput } = outputSlice.actions;

type RootState = ReturnType<typeof store.getState>;
const outputSelectors = outputsAdapter.getSelectors<RootState>(
  (state) => state.outputs
);

// Selectors
export const selectAllOutputs = outputSelectors.selectAll;
export const selectOutput = outputSelectors.selectById;

export default outputSlice.reducer;
