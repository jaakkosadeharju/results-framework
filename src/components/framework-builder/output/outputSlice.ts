import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Output } from "../../../framework.types";
import store, { RootState } from "../../../app/store";

const outputsAdapter = createEntityAdapter<Output>({
  selectId: (output) => output.id,
  sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
});

export const outputSlice = createSlice({
  name: "outputs",
  initialState: outputsAdapter.getInitialState(),
  reducers: {
    insertOutput: outputsAdapter.addOne,
    updateOutput: outputsAdapter.upsertOne,
    removeOutput: outputsAdapter.removeOne,
    removeMultipleOutputs: outputsAdapter.removeMany,
  },
});

export const {
  insertOutput,
  updateOutput,
  removeOutput,
  removeMultipleOutputs,
} = outputSlice.actions;
const outputSelectors = outputsAdapter.getSelectors<RootState>(
  (state) => state.outputs
);

// Selectors
export const selectAllOutputs = outputSelectors.selectAll;
export const selectOutput = outputSelectors.selectById;

export default outputSlice.reducer;
