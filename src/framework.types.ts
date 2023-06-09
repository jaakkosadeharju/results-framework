export type LevelType = "goal" | "outcome" | "output" | "activity";

export interface ResultLevel {
  type: LevelType;
  id: string;
  title: string;
  description?: string;
  indicatorIds: string[];
  childrenIds: string[];
  createdAt: string;
}

export type Goal = ResultLevel & { type: "goal" };
export type Outcome = ResultLevel & { type: "outcome" };
export type Output = ResultLevel & { type: "output" };
export type Activity = ResultLevel & { type: "activity" };

export type ValueIntervalType = "month" | "week" | "day";
export interface Indicator {
  id: string;
  title: string;
  weight: number;
  description?: string;
  baseline: number;
  target: number;
  unit: string;
  dueDate?: string;
  valueInterval?: number;
  valueIntervalType?: ValueIntervalType;
}

export interface IndicatorValue {
  id: string;
  indicatorId: string;
  value: number;
  date: string;
  note?: string;
}
