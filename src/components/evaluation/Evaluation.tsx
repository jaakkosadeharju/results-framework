import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import ButtonAppBar from "../ResponsiveAppBar";
import MainHeader from "../MainHeader";
import { selectAllGoals } from "../framework-builder/goal/goalSlice";
import { useSelector } from "react-redux";
import { calculateProgress } from "../../utils/calcluateProgress";
import { selectAllIndicators } from "../framework-builder/indicator/indicatorSlice";
import IndicatorValue from "./IndicatorValue";

export interface DashboardProps {}

const Evaluation: React.FC<DashboardProps> = ({}) => {
  const { t } = useTranslation();
  const allGoals = useSelector(selectAllGoals);
  const allIndicators = useSelector(selectAllIndicators);

  return (
    <div data-testid="Evaluation">
      <ButtonAppBar />
      <Container>
        <MainHeader>{t("evaluation.title")}</MainHeader>
        <Stack spacing={2}>
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
                  {g.title} ({calculateProgress(g)})
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
