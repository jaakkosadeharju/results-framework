import { useDispatch } from "react-redux";
import { Activity, Output } from "../../framework.types";
import FrameworkLevelCard from "../FrameworkLevelCard";
import RemoveIcon from "@mui/icons-material/Remove";
import { green } from "@mui/material/colors";
import { removeActivity, updateActivity } from "./activitySlice";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";
import { updateOutput } from "../framework-builder/output/outputSlice";
import { removeMultipleIndicators } from "../framework-builder/indicator/indicatorSlice";
import { cleanUpOrphans } from "../../app/store";

export interface ActivityCardProps {
  activity: Activity;
  parent: Output;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, parent }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleSave = () =>
    dispatch(updateActivity({ ...activity, title: "Updated" }));
  const handleDelete = () => {
    dispatch(
      updateOutput({
        ...parent,
        childrenIds: parent.childrenIds.filter((id) => id !== activity.id),
      })
    );
    cleanUpOrphans();
  };

  const handleIndicatorCreate = (indicatorId: string) => {
    dispatch(
      updateActivity({
        ...activity,
        indicatorIds: [...activity.indicatorIds, indicatorId],
      })
    );
  };
  const handleIndicatorDelete = (indicatorId: string) => {
    dispatch(
      updateActivity({
        ...activity,
        indicatorIds: activity.indicatorIds.filter(
          (iId) => iId !== indicatorId
        ),
      })
    );
  };
  const handleTitleChange = (title: string) => {
    dispatch(updateActivity({ ...activity, title }));
  };
  const handleDescriptionChange = (description: string) => {
    dispatch(updateActivity({ ...activity, description }));
  };

  return (
    <Box className="activity-card" data-testid="ActivityCard">
      <FrameworkLevelCard
        avatar={{ text: "A", color: green[500] }}
        item={activity}
        buttons={[
          { text: t("app.save"), onClick: handleSave },
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
    </Box>
  );
};

export default ActivityCard;
