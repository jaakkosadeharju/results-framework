import dayjs from "dayjs";
import { ValueIntervalType } from "../framework.types";

// Resolve by going back in time until we find a date in the past
export function resolveNextRecodingDateFromDueDate(
  dueDate: dayjs.Dayjs,
  interval: number,
  intervalType: ValueIntervalType
): dayjs.Dayjs | null {
  let nextRecordingDate: dayjs.Dayjs | null = null;
  let dateCursor = dueDate.clone();
  let now = dayjs();

  while (true) {
    dateCursor = dateCursor.add(-interval, intervalType);

    if (dateCursor < now) {
      break;
    }

    nextRecordingDate = dateCursor;
  }
  return nextRecordingDate;
}
