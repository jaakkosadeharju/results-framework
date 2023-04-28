import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import ButtonAppBar from "../ResponsiveAppBar";
import MainHeader from "../MainHeader";
import { selectAllGoals } from "../framework-builder/goal/goalSlice";
import { useSelector } from "react-redux";
import { calculateProgress } from "../../utils/calcluateProgress";
import {
  selectAllIndicators,
  selectIndicatorRecordingDates,
} from "../framework-builder/indicator/indicatorSlice";
import IndicatorValue from "./IndicatorValue";
import { useCallback } from "react";
import { selectAllIndicatorValues } from "../framework-builder/indicator/indicatorValueSlice";
import { Goal } from "../../framework.types";
import dayjs from "dayjs";

export interface DashboardProps {}

const Evaluation: React.FC<DashboardProps> = ({}) => {
  const { t } = useTranslation();
  const allGoals = useSelector(selectAllGoals);
  const allIndicators = useSelector(selectAllIndicators);
  const allIndicatorValues = useSelector(selectAllIndicatorValues);
  const recordingDateDetails = useSelector(selectIndicatorRecordingDates);
  const progress = useCallback(
    (g: Goal) => Math.round(calculateProgress(g) * 100),
    [allIndicatorValues]
  );

  const overdueIndicators = recordingDateDetails.filter(
    (d) => d.nextRecordingDate && d.nextRecordingDate <= dayjs()
  );
  const dueDateInOneWeek = recordingDateDetails.filter(
    (d) =>
      d.nextRecordingDate &&
      d.nextRecordingDate >= dayjs() &&
      d.nextRecordingDate < dayjs().add(1, "week")
  );
  const dueDateInOneMonth = recordingDateDetails.filter(
    (d) =>
      d.nextRecordingDate &&
      d.nextRecordingDate >= dayjs().add(1, "week") &&
      d.nextRecordingDate < dayjs().add(1, "month")
  );

  return (
    <div data-testid="Evaluation">
      <ButtonAppBar />
      <Container>
        <MainHeader>{t("evaluation.title")}</MainHeader>
        <Stack spacing={2}>
          <Paper>
            <Box padding={2}>
              {overdueIndicators.length > 0 && (
                <Typography variant="h6">Overdue</Typography>
              )}
              {overdueIndicators.map(({ indicator, nextRecordingDate }) => (
                <Box key={indicator.id}>
                  {indicator.title} ({nextRecordingDate?.format("L")})
                </Box>
              ))}
              {dueDateInOneWeek.length > 0 && (
                <Typography variant="h6">Upcoming in a week</Typography>
              )}
              {dueDateInOneWeek.map(({ indicator, nextRecordingDate }) => (
                <Box key={indicator.id}>
                  {indicator.title} ({nextRecordingDate?.format("L")})
                </Box>
              ))}
              {dueDateInOneMonth.length > 0 && (
                <Typography variant="h6">Upcoming in a month</Typography>
              )}
              {dueDateInOneMonth.map(({ indicator, nextRecordingDate }) => (
                <Box key={indicator.id}>
                  {indicator.title} ({nextRecordingDate?.format("L")})
                </Box>
              ))}
            </Box>
          </Paper>
          <Paper>
            <Box padding={2}>
              {allIndicators.map((i) => (
                <IndicatorValue key={i.id} indicator={i} />
              ))}
            </Box>
          </Paper>
          <Paper>
            <Box padding={2}>
              {allGoals.map((g) => (
                <Box key={g.id}>
                  {g.title} ({progress(g)} %)
                </Box>
              ))}
            </Box>
          </Paper>
        </Stack>
      </Container>
    </div>
  );
};

export default Evaluation;
