import { useDispatch } from "react-redux";
import { Activity } from "../../results";
import FrameworkLevelCard from "../FrameworkLevelCard";
import RemoveIcon from "@mui/icons-material/Remove";
import { green } from "@mui/material/colors";
import { removeActivity, upsertActivity } from "./activitySlice";
import { useTranslation } from "react-i18next";

export interface ActivityCardProps {
  activity: Activity;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleSave = () =>
    dispatch(upsertActivity({ ...activity, title: "Updated" }));
  const handleDelete = () => dispatch(removeActivity(activity.id));

  const handleIndicatorCreate = (indicatorId: string) => {
    dispatch(
      upsertActivity({
        ...activity,
        indicatorIds: [...activity.indicatorIds, indicatorId],
      })
    );
  };
  const handleIndicatorDelete = (indicatorId: string) => {
    dispatch(
      upsertActivity({
        ...activity,
        indicatorIds: activity.indicatorIds.filter(
          (iId) => iId !== indicatorId
        ),
      })
    );
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
      />
    </>
  );
};

export default ActivityCard;
