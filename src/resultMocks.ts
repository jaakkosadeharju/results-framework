import generateId from "./app/generateId";
import { Activity, Goal, Indicator, Outcome, Output } from "./framework.types";

export const mockGoal = (options?: Partial<Goal>): Goal => ({
  type: "goal",
  id: generateId(),
  title: "Goal 1",
  description: "Goal 1 description",
  indicatorIds: [],
  childrenIds: [],
  createdAt: new Date().toISOString(),
  ...options,
});

export const mockOutcome = (options?: Partial<Outcome>): Outcome => ({
  type: "outcome",
  id: generateId(),
  title: "Outcome 1",
  description: "Outcome 1 description",
  indicatorIds: [],
  childrenIds: [],
  createdAt: new Date().toISOString(),
  ...options,
});

export const mockOutput = (options?: Partial<Output>): Output => ({
  type: "output",
  id: generateId(),
  title: "Output 1",
  description: "Output 1 description",
  indicatorIds: [],
  childrenIds: [],
  createdAt: new Date().toISOString(),
  ...options,
});

export const mockActivity = (options?: Partial<Activity>): Activity => ({
  type: "activity",
  id: generateId(),
  title: "Activity 1",
  description: "Activity 1 description",
  indicatorIds: [],
  childrenIds: [],
  createdAt: new Date().toISOString(),
  ...options,
});

export const mockIndicator = (options?: Partial<Indicator>): Indicator => ({
  id: generateId(),
  title: "Indicator 1",
  weight: 1,
  description: "Indicator 1 description",
  baseline: 0,
  target: 100,
  unit: "unit",
  ...options,
});
