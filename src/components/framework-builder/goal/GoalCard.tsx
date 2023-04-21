import { Box, Button, Card, collapseClasses } from "@mui/material";
import { Goal } from "../../../results";
import FrameworkLevelCard from "../../FrameworkLevelCard";
import OutcomeCard from "../outcome/OutcomeCard";
import { generateId } from "../../../app/generateId";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { deepOrange } from "@mui/material/colors";
import { removeGoal, upsertGoal } from "./goalSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectAllOutcomes, upsertOutcome } from "../outcome/outcomeSlice";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export interface GoalCardProps {
  goal: Goal;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const allOutcomes = useSelector(selectAllOutcomes);
  const outcomes = useMemo(
    () => allOutcomes.filter((o) => goal.childrenIds.includes(o.id)),
    [allOutcomes, goal.childrenIds]
  );
  const handleSave = () => dispatch(upsertGoal({ ...goal, title: "Updated" }));
  const handleDelete = () => dispatch(removeGoal(goal.id));
  const handleNewOutcome = () => {
    const outcomeId = generateId();
    dispatch(
      upsertGoal({ ...goal, childrenIds: [...goal.childrenIds, outcomeId] })
    );
    dispatch(
      upsertOutcome({
        type: "outcome",
        id: outcomeId,
        title: "New outcome",
        childrenIds: [],
        indicatorIds: [],
      })
    );
  };
  const handleIndicatorCreate = (indicatorId: string) => {
    dispatch(
      upsertGoal({ ...goal, indicatorIds: [...goal.indicatorIds, indicatorId] })
    );
  };
  const handleIndicatorDelete = (indicatorId: string) => {
    dispatch(
      upsertGoal({
        ...goal,
        indicatorIds: goal.indicatorIds.filter((iId) => iId !== indicatorId),
      })
    );
  };

  return (
    <>
      <FrameworkLevelCard
        avatar={{ text: "G", color: deepOrange[500] }}
        item={goal}
        buttons={[
          { text: t("app.save"), onClick: handleSave },
          {
            text: t("frameworkBuilder.goal.add_outcome"),
            icon: <AddIcon />,
            onClick: handleNewOutcome,
          },
          {
            text: t("app.delete"),
            icon: <RemoveIcon />,
            onClick: handleDelete,
          },
        ]}
        onIndicatorCreate={handleIndicatorCreate}
        onIndicatorDelete={handleIndicatorDelete}
      />
      <Box ml={2}>
        {outcomes.map((o) => (
          <OutcomeCard
            key={o.id}
            goalId={goal.id ?? generateId()}
            outcome={o}
          />
        ))}
      </Box>
    </>
  );
};

export default GoalCard;
