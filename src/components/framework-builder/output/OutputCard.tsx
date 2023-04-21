import { Box, Button } from "@mui/material";
import { Output } from "../../../results";
import ActivityCard from "../../activity/ActivityCard";
import FrameworkLevelCard from "../../FrameworkLevelCard";
import { generateId } from "../../../app/generateId";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { pink } from "@mui/material/colors";
import { removeOutput, upsertOutput } from "./outputSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllActivities,
  upsertActivity,
} from "../../activity/activitySlice";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export interface OutputCardProps {
  output: Output;
}

const OutputCard: React.FC<OutputCardProps> = ({ output }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const allActivities = useSelector(selectAllActivities);
  const activities = useMemo(
    () => allActivities.filter((a) => output.childrenIds.includes(a.id)),
    [allActivities, output.childrenIds]
  );
  const handleDelete = () => dispatch(removeOutput(output.id));
  const handleSave = () =>
    dispatch(upsertOutput({ ...output, title: "Updated" }));
  const handleAddActivity = () => {
    const activityId = generateId();
    dispatch(
      upsertOutput({
        ...output,
        childrenIds: [...output.childrenIds, activityId],
      })
    );
    dispatch(
      upsertActivity({
        type: "activity",
        id: activityId,
        title: "New activity",
        childrenIds: [],
        indicatorIds: [],
      })
    );
  };
  const handleIndicatorCreate = (indicatorId: string) => {
    dispatch(
      upsertOutput({
        ...output,
        indicatorIds: [...output.indicatorIds, indicatorId],
      })
    );
  };
  const handleIndicatorDelete = (indicatorId: string) => {
    dispatch(
      upsertOutput({
        ...output,
        indicatorIds: output.indicatorIds.filter((iId) => iId !== indicatorId),
      })
    );
  };

  return (
    <>
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
      />
      <Box ml={2}>
        {activities.map((a) => (
          <ActivityCard key={a.id} activity={a} />
        ))}
      </Box>
    </>
  );
};

export default OutputCard;
