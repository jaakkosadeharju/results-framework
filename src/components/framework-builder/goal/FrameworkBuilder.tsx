import { Box, Button, Container, Paper, Typography } from "@mui/material";
import GoalCard from "./GoalCard";
import AddIcon from "@mui/icons-material/Add";
import { generateId } from "../../../app/generateId";
import { useDispatch, useSelector } from "react-redux";
import { selectAllGoals, insertGoal } from "./goalSlice";
import { useTranslation } from "react-i18next";
import ButtonAppBar from "../../ResponsiveAppBar";
import MainHeader from "../../MainHeader";
import theme from "../../../theme";

export interface GoalListProps {}

const FrameworkBuilder: React.FC<GoalListProps> = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const goals = useSelector(selectAllGoals);
  const handleNewGoal = () => {
    dispatch(
      insertGoal({
        type: "goal",
        id: generateId(),
        title: t("frameworkBuilder.goal.defaultName"),
        childrenIds: [],
        indicatorIds: [],
        createdAt: new Date().toISOString(),
      })
    );
  };

  return (
    <>
      <ButtonAppBar />
      <Container>
        <MainHeader>{t("frameworkBuilder.title")}</MainHeader>
        <Paper
          elevation={2}
          style={{
            backgroundColor: theme.palette.background.default,
            color: "white",
          }}
        >
          <Box p={3}>
            {goals.length === 0 ? (
              <Typography variant="body1">
                {t("frameworkBuilder.noGoalsInstructions")}
              </Typography>
            ) : (
              goals.map((g) => <GoalCard key={g.id} goal={g} />)
            )}
          </Box>
        </Paper>
        <Box
          mt={2}
          sx={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            display: "flex",
          }}
        >
          <Button variant="contained" onClick={handleNewGoal}>
            <AddIcon />
            {t("frameworkBuilder.addGoal")}
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default FrameworkBuilder;
