import { combineReducers, configureStore } from "@reduxjs/toolkit";
import goalReducer from "../components/framework-builder/goal/goalSlice";
import outcomeSlice from "../components/framework-builder/outcome/outcomeSlice";
import outputSlice from "../components/framework-builder/output/outputSlice";
import activitySlice from "../components/activity/activitySlice";
import indicatorSlice from "../components/framework-builder/indicator/indicatorSlice";
import indicatorValueSlice from "../components/framework-builder/indicator/indicatorValueSlice";

const persistedState: any = JSON.parse(
  localStorage.getItem("appState") ?? "{}"
);

const rootReducer = combineReducers({
  goals: goalReducer,
  outcomes: outcomeSlice,
  outputs: outputSlice,
  activities: activitySlice,
  indicators: indicatorSlice,
  indicatorValues: indicatorValueSlice,
});

const setupStore = (preloadedState?: any) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });

const store = setupStore(persistedState);

store.subscribe(() => {
  localStorage.setItem("appState", JSON.stringify(store.getState()));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;

export default store;
