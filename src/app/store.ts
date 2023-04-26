import { combineReducers, configureStore } from "@reduxjs/toolkit";
import goalReducer, {
  removeGoal,
} from "../components/framework-builder/goal/goalSlice";
import outcomeSlice, {
  removeMultipleOutcomes,
} from "../components/framework-builder/outcome/outcomeSlice";
import outputSlice, {
  removeMultipleOutputs,
} from "../components/framework-builder/output/outputSlice";
import activitySlice, {
  removeMultipleActivities,
} from "../components/activity/activitySlice";
import indicatorSlice, {
  removeMultipleIndicators,
} from "../components/framework-builder/indicator/indicatorSlice";
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

// Clean up orphan entities. This should be called after result level is deleted.
export const cleanUpOrphans = () => {
  let s = store.getState();
  const validOutcomeIds = Object.values(s.goals.entities).flatMap(
    (g) => g?.childrenIds
  );
  store.dispatch(
    removeMultipleOutcomes(
      s.outcomes.ids.filter((oId) => !validOutcomeIds.includes(oId as string))
    )
  );

  s = store.getState();
  const validOutputIds = Object.values(s.outcomes.entities).flatMap(
    (o) => o?.childrenIds
  );
  store.dispatch(
    removeMultipleOutputs(
      s.outputs.ids.filter((oId) => !validOutputIds.includes(oId as string))
    )
  );

  s = store.getState();
  const validActivityIds = Object.values(s.outputs.entities).flatMap(
    (o) => o?.childrenIds
  );
  store.dispatch(
    removeMultipleActivities(
      s.activities.ids.filter(
        (aId) => !validActivityIds.includes(aId as string)
      )
    )
  );

  s = store.getState();
  const validIndicatorIds = [
    ...Object.values(s.goals.entities),
    ...Object.values(s.outcomes.entities),
    ...Object.values(s.outputs.entities),
    ...Object.values(s.activities.entities),
  ].flatMap((e) => e?.indicatorIds);
  store.dispatch(
    removeMultipleIndicators(
      s.indicators.ids.filter(
        (iId) => !validIndicatorIds.includes(iId as string)
      )
    )
  );
};

store.subscribe(() => {
  localStorage.setItem("appState", JSON.stringify(store.getState()));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;

export default store;
