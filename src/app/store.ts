import { configureStore } from "@reduxjs/toolkit";
import goalReducer from "../components/framework-builder/goal/goalSlice";
import outcomeSlice from "../components/framework-builder/outcome/outcomeSlice";
import outputSlice from "../components/framework-builder/output/outputSlice";
import activitySlice from "../components/activity/activitySlice";
import indicatorSlice from "../components/framework-builder/indicator/indicatorSlice";

const persistedState: any = JSON.parse(
  localStorage.getItem("appState") ?? "{}"
);

const store = configureStore({
  reducer: {
    goals: goalReducer,
    outcomes: outcomeSlice,
    outputs: outputSlice,
    activities: activitySlice,
    indicators: indicatorSlice,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  localStorage.setItem("appState", JSON.stringify(store.getState()));
});

export default store;
