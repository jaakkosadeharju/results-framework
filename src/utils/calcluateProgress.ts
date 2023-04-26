import { Dictionary } from "@reduxjs/toolkit";
import store from "../app/store";
import { selectIndicatorValuesByIndicatorId } from "../components/framework-builder/indicator/indicatorValueSlice";
import { Indicator, LevelType, ResultLevel } from "../framework.types";

const childrenType: { [key: string]: string } = {
  goal: "outcomes",
  outcome: "outputs",
  output: "activities",
};

export function calculateProgress(level: ResultLevel): number {
  const state = store.getState();
  const indicators = level.indicatorIds
    .map((iId) => state.indicators.entities[iId] as Indicator)
    .map((indicator) => ({
      indicator,
      values: selectIndicatorValuesByIndicatorId(state, indicator.id),
    }));

  const children = level.childrenIds.map(
    (cId) =>
      (
        state[childrenType[level.type] as "goals" | "outcomes" | "outputs"]
          ?.entities as Dictionary<ResultLevel>
      )[cId] as ResultLevel
  );

  // TODO: Add weight. Now assuming weight 1 for all children
  const childrenProgress = children
    .map((c) => calculateProgress(c))
    .reduce((m, v) => m + v, 0);

  const totalWeight = indicators.reduce(
    (m, ind) => m + ind.indicator.weight,
    0
  );

  // calculate weighted values
  const weightedValues = indicators.map((i) => {
    const { baseline, target, weight } = i.indicator;
    const latestValue =
      i.values.sort((a, b) => (a.date < b.date ? 1 : -1))[0]?.value ??
      i.indicator.baseline;

    return (weight * (latestValue - baseline)) / (target - baseline);
  });

  // sum weighted values
  const weightedTotal = weightedValues.reduce((m, v) => m + v, 0);

  // calculate progress
  return (weightedTotal + childrenProgress) / (totalWeight + children.length);
}
