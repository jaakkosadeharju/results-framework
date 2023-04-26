import { Box, Button } from "@mui/material";
import { Outcome, Output } from "../../../framework.types";
import ActivityCard from "../../activity/ActivityCard";
import FrameworkLevelCard from "../../FrameworkLevelCard";
import { generateId } from "../../../app/generateId";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { pink } from "@mui/material/colors";
import { removeOutput, updateOutput } from "./outputSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllActivities,
  insertActivity,
} from "../../activity/activitySlice";
import { useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { scrollToLastChild } from "../../../utils/scrollToChild";
import { updateOutcome } from "../outcome/outcomeSlice";
import { cleanUpOrphans } from "../../../app/store";

export interface OutputCardProps {
  output: Output;
  parent: Outcome;
}

const OutputCard: React.FC<OutputCardProps> = ({ output, parent }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const cardRef = useRef<HTMLDivElement>(null);
  const allActivities = useSelector(selectAllActivities);
  const activities = useMemo(
    () => allActivities.filter((a) => output.childrenIds.includes(a.id)),
    [allActivities, output.childrenIds]
  );
  const handleDelete = () => {
    dispatch(
      updateOutcome({
        ...parent,
        childrenIds: parent.childrenIds.filter((id) => id !== output.id),
      })
    );
    cleanUpOrphans();
  };
  const handleSave = () =>
    dispatch(updateOutput({ ...output, title: "Updated" }));
  const handleAddActivity = () => {
    const activityId = generateId();
    dispatch(
      updateOutput({
        ...output,
        childrenIds: [...output.childrenIds, activityId],
      })
    );
    dispatch(
      insertActivity({
        type: "activity",
        id: activityId,
        title: t("frameworkBuilder.activity.defaultName"),
        childrenIds: [],
        indicatorIds: [],
        createdAt: new Date().toISOString(),
      })
    );
    scrollToLastChild(cardRef.current, ".activity-card", { offset: 0 });
  };
  const handleIndicatorCreate = (indicatorId: string) => {
    dispatch(
      updateOutput({
        ...output,
        indicatorIds: [...output.indicatorIds, indicatorId],
      })
    );
  };
  const handleIndicatorDelete = (indicatorId: string) => {
    dispatch(
      updateOutput({
        ...output,
        indicatorIds: output.indicatorIds.filter((iId) => iId !== indicatorId),
      })
    );
  };
  const handleTitleChange = (title: string) => {
    dispatch(updateOutput({ ...output, title }));
  };
  const handleDescriptionChange = (description: string) => {
    dispatch(updateOutput({ ...output, description }));
  };

  return (
    <Box className="output-card" data-testid="OutputCard" ref={cardRef}>
      <FrameworkLevelCard
        avatar={{ text: "OP", color: pink[300] }}
        item={output}
        buttons={[
          { text: t("app.save"), onClick: handleSave },
          {
            text: t("frameworkBuilder.output.addActivity"),
            icon: <AddIcon />,
            onClick: handleAddActivity,
          },
          {
            text: t("app.delete"),
            icon: <RemoveIcon />,
            onClick: handleDelete,
          },
        ]}
        onIndicatorCreate={handleIndicatorCreate}
        onIndicatorDelete={handleIndicatorDelete}
        onTitleChange={handleTitleChange}
        onDescriptionChange={handleDescriptionChange}
      />
      <Box ml={2}>
        {activities.map((a) => (
          <ActivityCard key={a.id} activity={a} parent={output} />
        ))}
      </Box>
    </Box>
  );
};

export default OutputCard;
