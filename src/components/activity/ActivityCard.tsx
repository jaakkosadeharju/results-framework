import { useDispatch } from "react-redux";
import { Activity } from "../../results";
import FrameworkLevelCard from "../FrameworkLevelCard";
import RemoveIcon from "@mui/icons-material/Remove";
import { green } from "@mui/material/colors";
import { removeActivity, updateActivity } from "./activitySlice";
import { useTranslation } from "react-i18next";

export interface ActivityCardProps {
  activity: Activity;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleSave = () =>
    dispatch(updateActivity({ ...activity, title: "Updated" }));
  const handleDelete = () => dispatch(removeActivity(activity.id));

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
    <>
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
    </>
  );
};

export default ActivityCard;
