import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import type { AppStore, RootState } from "./app/store";
import goalSlice from "./components/framework-builder/goal/goalSlice";
import outcomeSlice from "./components/framework-builder/outcome/outcomeSlice";
import outputSlice from "./components/framework-builder/output/outputSlice";
import activitySlice from "./components/activity/activitySlice";
import indicatorSlice from "./components/framework-builder/indicator/indicatorSlice";
import indicatorValueSlice from "./components/framework-builder/indicator/indicatorValueSlice";
// As a basic setup, import your same slice reducers

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: {
        goals: goalSlice,
        outcomes: outcomeSlice,
        outputs: outputSlice,
        activities: activitySlice,
        indicators: indicatorSlice,
        indicatorValues: indicatorValueSlice,
      },
      preloadedState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
