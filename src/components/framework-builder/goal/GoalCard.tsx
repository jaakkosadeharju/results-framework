import { Box } from "@mui/material";
import { Goal } from "../../../framework.types";
import FrameworkLevelCard from "../../FrameworkLevelCard";
import OutcomeCard from "../outcome/OutcomeCard";
import { generateId } from "../../../app/generateId";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { deepOrange } from "@mui/material/colors";
import { removeGoal, updateGoal } from "./goalSlice";
import { useDispatch, useSelector } from "react-redux";
import { insertOutcome, selectAllOutcomes } from "../outcome/outcomeSlice";
import { useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { scrollToLastChild } from "../../../utils/scrollToChild";

export interface GoalCardProps {
  goal: Goal;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const cardRef = useRef<HTMLDivElement>(null);
  const allOutcomes = useSelector(selectAllOutcomes);
  const outcomes = useMemo(
    () => allOutcomes.filter((o) => goal.childrenIds.includes(o.id)),
    [allOutcomes, goal.childrenIds]
  );
  const handleSave = () => dispatch(updateGoal({ ...goal, title: "Updated" }));
  const handleDelete = () => dispatch(removeGoal(goal.id));
  const handleNewOutcome = () => {
    const outcomeId = generateId();
    dispatch(
      updateGoal({ ...goal, childrenIds: [...goal.childrenIds, outcomeId] })
    );
    dispatch(
      insertOutcome({
        type: "outcome",
        id: outcomeId,
        title: t("frameworkBuilder.outcome.defaultName"),
        childrenIds: [],
        indicatorIds: [],
        createdAt: new Date().toISOString(),
      })
    );

    scrollToLastChild(cardRef.current, ".outcome-card", { offset: -50 });
  };
  const handleIndicatorCreate = (indicatorId: string) => {
    dispatch(
      updateGoal({ ...goal, indicatorIds: [...goal.indicatorIds, indicatorId] })
    );
  };
  const handleIndicatorDelete = (indicatorId: string) => {
    dispatch(
      updateGoal({
        ...goal,
        indicatorIds: goal.indicatorIds.filter((iId) => iId !== indicatorId),
      })
    );
  };
  const handleTitleChange = (title: string) =>
    dispatch(updateGoal({ ...goal, title }));
  const handleDescriptionChange = (description: string) => {
    dispatch(updateGoal({ ...goal, description }));
  };

  return (
    <Box data-testid="GoalCard" ref={cardRef}>
      <FrameworkLevelCard
        avatar={{ text: "G", color: deepOrange[500] }}
        item={goal}
        buttons={[
          { text: t("app.save"), onClick: handleSave },
          {
            text: t("frameworkBuilder.goal.add_outcome"),
            icon: <AddIcon />,
            onClick: handleNewOutcome,
            testid: "add-outcome-button",
          },
          {
            text: t("app.delete"),
            icon: <RemoveIcon />,
            onClick: handleDelete,
            testid: "delete-goal-button",
          },
        ]}
        onIndicatorCreate={handleIndicatorCreate}
        onIndicatorDelete={handleIndicatorDelete}
        onTitleChange={handleTitleChange}
        onDescriptionChange={handleDescriptionChange}
      />
      <Box ml={2}>
        {outcomes.map((o) => (
          <OutcomeCard key={o.id} parent={goal} outcome={o} />
        ))}
      </Box>
    </Box>
  );
};

export default GoalCard;
